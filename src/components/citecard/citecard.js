import { h, Component } from 'preact';
import axios from 'axios';
import qs from 'qs';
import BaseCiteCard from './basecitecard';
import {CircularProgress} from '@material-ui/core';


export default class CiteCard extends Component {
  state = {
    styles: [],
    style: {},
    citation: "Your citation will appear here...",
    result: {},
    progress: false
  }

  constructor() {
    super();
    console.log(process.env.BIBSERVERURL + "/api/styles");
    axios.get(process.env.BIBSERVERURL + "/api/styles")
      .then((res) => {
        console.log("sty", res.data.citationStyles);
        this.setState({styles: res.data.citationStyles});
        this.setState({style: res.data.citationStyles[0]});
      })
      .catch((err) => {
        if (process.env.BIBSERVERURL.startswith("http")) {
            console.error("Cannot call plain HTTP backend from HTTPS frontend. Switch your backend URL to HTTPS.")
            this.props.showBanner("error", "Error: Cannot call plain HTTP backend from HTTPS frontend; the site is not properly set up. Contact the site administrator.");
        } else {
            console.error("Styles fetch failed:", err);
            this.props.showBanner("error", "Error: Could not fetch styles list; backend is probably down. Try again later.");
        }
      });
  }

  cite(style, result) {
    // Default, empty result field has only empty authors list - ignore "empty" results
    if (Object.keys(result).length <= 1) return;
    console.log("sss", result);
    let sendResult = {...result};
    sendResult.style = style;
    sendResult.thumbnail = "";

    this.setState({progress: true});
    axios.get(process.env.BIBSERVERURL + "/api/cite?" + qs.stringify(sendResult, { format : 'RFC3986' }))
    .then((res) => {
      console.log(res.data);
      this.setState({citation: res.data, progress: false});
    }).catch((err) => {
      console.log("Fetch failed:", err);
      this.setState({progress: false});
      this.props.showBanner("error", "Error: couldn't get citation. Try reloading.");
    })
  }

  onStyleChange = (style) => {
    this.setState({style: style});
    this.cite(style.citationFile, this.state.result);

    this.props.onStyleChange(style);
  }

  onStyleChooserSelect = (style) => {
    this.setState(state => {
      let styles = [...state.styles];
      styles[0] = style;
      return {
        styles: styles
      };
    });

    this.onStyleChange(style);
  }

  componentDidUpdate(previousProps, previousState, snapshot) {
    if (previousState.result != this.props.result) {
      // Cite (make request to backend server)
      console.log("soiw", previousState.result);

      let citation = "Your citation will appear here...";
      citation = this.cite(this.state.style.citationFile, this.props.result) || citation;
      this.setState({result: this.props.result, citation: citation});
    }
  }

  render() {
    return (
      <BaseCiteCard
        progress={this.state.progress}
        content={this.state.citation}
        onStyleChange={this.onStyleChange}
        onStyleChooserSelect={this.onStyleChooserSelect}
        styles={this.state.styles}
      />
    );
  }
};
