import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Tab, Tabs, Select } from '@material-ui/core';

export default class Header extends Component {
  state = {
    value: 0,
    tabName: "Book"
  }

  tabs = ["Book", "Website", "Journal", "Article"];

  handleChange = (event, value) => {
    this.setState({value: value, tabName: this.tabs[value]});
    this.props.onTabChange(this.state.value, this.state.tabName);
  };

  getValue() {
    return this.state.value;
  }

  render() {
    let tab_components = [];
    for (let tab of this.tabs) {
      tab_components.push(<Tab label={tab} />);
    }

    return (
      <Tabs
        centered
        value={this.state.value}
        onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="cite-options"
        className={this.props.className}
      >
        {tab_components}
      </Tabs>
    )
  }
}
