import { h, Component } from 'preact';
import axios from 'axios';
import qs from 'qs';
import { CircularProgress } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Box, TextField, Button, Divider, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import style from '../style.css';

export default class StyleChooser extends Component {
  state = {
    styles: [],
    progress: false,
    query: ""
  }

  constructor() {
    super();
    axios.get(process.env.BIBSERVERURL + "/api/styles")
      .then((res) => {
        this.setState({styles: res.data.citationStyles});
      })
      .catch((err) => {
        console.log("Styles fetch failed:", err);
      });
  }

  search = () => {
    this.setState({progress: true});
    axios.get(process.env.BIBSERVERURL + "/api/styles/search?" + qs.stringify({q: this.state.query, limit: 20}, { format : 'RFC3986' }))
    .then((res) => {
      this.setState({styles: res.data, progress: false})
    }).catch((err) => {
      console.log("Fetch failed:", err)
    })
  }

  onQueryChange = (e) => {
    this.setState({query: e.target.value});
  }

  onStyleSelect = (index) => {
    let style = this.state.styles[index];

    if (this.props.onStyleSelect != undefined) {
      this.props.onStyleSelect(style);
    }
  }

  render() {
    let results = [];
    for (let s = 0; s < this.state.styles.length; s++) {
      results.push(
        <ListItem button onclick={() => this.onStyleSelect(s)}>
          <ListItemText
            primary={this.state.styles[s].citationName}
          />
        </ListItem>
      );
    }

    return (
      <div className={style.biggermargin}>
        <Box display="flex" flexDirection="row" width="100%">
          <Box flexGrow={1}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              type="search"
              label="Search for a style..."
              value={this.state.query}
              onChange={this.onQueryChange}
            />
          </Box>
          <Box ml="-5px">
            <Button
              className={style.fullbtn}
              variant="contained"
              edge="start"
              color="primary"
              disableElevation
              onClick={this.search}
            >
              { this.state.progress ?
                <CircularProgress color="primary" /> :
                <Search />
              }
            </Button>
          </Box>
        </Box>
        <Divider className={style.biggermargin} />
        <List>
          {results}
        </List>
        <p className={style.footnote}>Over 9000 available citation styles. Powered by citeproc.js.</p>
      </div>
    );
  }
};
