import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import { Tab, Tabs, Collapse, Button, Grid } from '@material-ui/core';

import style from './style';

export default class Header extends Component {
  state = {
    value: 1,
    tabValue: 1,
    tabName: "Webpage",
    supported: true,
    overflowTab: {
      name: "Other...",
      tabValue: -1
    },
    expanded: false
  }

  tabs = [
    "Book",
    "Webpage",
    "Journal",
    "LEAVE_EMPTY",
    "Article",
    "Painting/Sculpture/Photograph",
    "Personal Interview",
    "Published Interview",
    "Song or Album",
    "Online Song or Album",
    "Film or Movie",
    "TV Show",
    "Podcast",
  ];

  supportedSources = [
    "Book",
    "Webpage"
  ]

  handleChange = (event, value) => {
    if (value == 3) {
      console.log(this.state.overflowTab);
      if (this.state.overflowTab.tabValue < 0) {
        this.setState({
          tabValue: 3,
          expanded: !this.state.expanded
        });
        let supported = this.supportedSources.indexOf(this.tabs[value]);
        this.props.onTabChange(value, this.state.tabName, supported != -1);
      } else {
        this.setState({
          value: this.state.overflowTab.tabValue,
          tabName: this.state.overflowTab.tabName,
          tabValue: 3,
          expanded: !this.state.expanded
        });
        let supported = this.supportedSources.indexOf(this.tabs[value]);
        this.props.onTabChange(value, this.state.overflowTab.name, supported != -1 && supported != null);
      }
    } else if (value < 3) {
      this.setState({expanded: false});
      this.setState({value: value, tabValue: value, tabName: this.tabs[value]});
      let supported = this.supportedSources.indexOf(this.tabs[value]);
      this.props.onTabChange(value, this.tabs[value], supported != -1);
    } else {
      this.setState({value: value, tabValue: 3});
      let supported = this.supportedSources.indexOf(this.tabs[value]);
      this.props.onTabChange(value, this.tabs[value], supported != -1);
    }
  };

  setOtherTab = (index, name) => {
    this.setState({
      tabName: name,
      value: index,
      overflowTab: {
        name: name,
        tabValue: index,
      }
    });

    this.handleChange(null, index);
  };

  render() {
    let tabs = [...this.tabs];

    let tab_components = [];
    // Create tabs
    for (let tab of tabs.splice(0, 3)) {
      tab_components.push(<Tab label={tab} />);
    }

    // Move all leftover tabs to collapsed overflow area
    tabs.splice(0, 1);
    let tab_overflow_components = []
    for (let index in tabs) {
      let tab = tabs[index];
      console.log(index, tab);
      tab_overflow_components.push(<Tab label={tab} onClick={() => this.setOtherTab(parseInt(index)+4, tab)} />)
    }

    let numRows = tab_overflow_components.length;
    let rows = [];
    let columns = [];

    for (let tab of tab_overflow_components) {
      columns.push(
        <Grid container item sm={3} className={style.colum} direction="column" justify="center" alignItems="center">
          {tab}
        </Grid>
      );

      if (columns.length == 4) {
        rows.push(
          <Grid container direction="row" justify="center" alignItems="center" fullWidth>
            {columns}
          </Grid>
        );
        columns = [];
      }
    }

    if (columns.length != 0) {
      while (columns.length < 4) {
        columns.push(
          <Grid container item sm={3} className={style.colum} direction="column" justify="center" alignItems="center">
            <Tab label=" " disabled />
          </Grid>
        );
      }
      console.log(columns);

      rows.push(
        <Grid container direction="row" justify="center" alignItems="center" fullWidth>
          {columns}
        </Grid>
      );
    }

    return (
      <div>
        <Tabs
          centered
          value={this.state.tabValue}
          onChange={this.handleChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="cite-options"
        >
          {tab_components}
          <Tab label={this.state.overflowTab.name} />
        </Tabs>
        <Collapse in={this.state.expanded} className={style.background}>
          {rows}
        </Collapse>
      </div>
    )
  }
}
