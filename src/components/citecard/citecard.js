import { h, Component } from 'preact';
import axios from 'axios';
import BaseCiteCard from './basecitecard';
import config from '../../../config.json';

export default class CiteCard extends Component {
  state = {
    styles: [],
    citation: "Your citation will appear here..."
  }

  constructor() {
    super();
    console.log(config.bibserverURL + "/api/styles");
    axios.get(config.bibserverURL + "/api/styles")
      .then((res) => {
        console.log(res.data.citationStyles);
        this.setState({styles: res.data.citationStyles});
      })
      .catch((err) => {
        console.log("Styles fetch failed:", err);
      });
  }

  onStyleChange = (v, name) => {
    console.log(v, name);
  }

  render() {
    return (
      <BaseCiteCard
        text={this.state.citation}
        onStyleChange={this.onStyleChange}
        styles={this.state.styles}
      />
    );
  }
};
