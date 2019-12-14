import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Tab, Tabs } from '@material-ui/core';

export default class Header extends Component {
  state = {
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.callback(value);
  };

  getValue() {
    return this.state.value;
  }

  render() {
    return (
      <Tabs
        centered
        value={this.state.value}
        onChange={this.handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="cite-options"
      >
        <Tab label="Book" />
        <Tab label="Website" />
        <Tab label="Journal" />
        <Tab label="Report" />
      </Tabs>
    )
  }
}
