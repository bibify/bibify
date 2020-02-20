import { h, Component } from 'preact';
import axios from 'axios';
import qs from 'qs';
import BaseCiteCard from './basecitecard';
import config from '../../../config.json';


export default class CiteCard extends Component {
  state = {
    styles: [],
    style: "mla8",
    citation: "Your citation will appear here...",
    result: {}
  }

  constructor() {
    super();
    console.log(config.bibserverURL + "/api/styles");
    axios.get(config.bibserverURL + "/api/styles")
      .then((res) => {
        console.log("sty", res.data.citationStyles);
        this.setState({styles: res.data.citationStyles});
        this.setState({style: res.data.citationStyles[0]});
      })
      .catch((err) => {
        console.log("Styles fetch failed:", err);
      });
  }

  cite(style, result) {
    result.style = style;
    console.log("style", style);
    console.log("result_sent", result);
    axios.get(config.bibserverURL + "/api/cite?" + qs.stringify(result, { format : 'RFC3986' }))
    .then((res) => {
      console.log(res.data);
      this.setState({citation: res.data})
    }).catch((err) => {
      console.log("Fetch failed:", err)
    })
  }

  onStyleChange = (v, name) => {
    console.log("st", v, name);

    this.setState({style: this.state.styles[v]});
    cite(this.state.styles[v], this.state.result);
  }

  componentDidUpdate(previousProps, previousState, snapshot) {
    if (this.props.result != previousProps.result) {
      // Cite (make request to backend server)
      console.log("soiw", this.state.style);
      let citation = this.cite(this.state.style.citationFile, this.props.result);
      this.setState({result: this.props.result, citation: citation});
    }
  }

  render() {
    return (
      <BaseCiteCard
        content={this.state.citation}
        onStyleChange={this.onStyleChange}
        styles={this.state.styles}
      />
    );
  }
};
