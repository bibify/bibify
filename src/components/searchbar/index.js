import { h, Component } from 'preact';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { Search } from '@material-ui/icons';

import style from './style';
import * as search from './search';

export default class SearchBar extends Component {
  state = {
    query: "",
    progress: false
  }

  getResults = async () => {
    console.log("Getting results");
    this.setState({progress: true});

    switch (this.props.type) {
      case "book":
        search.searchBook(this.state.query)
          .then((results) => {
            this.setState({progress: false});
            console.log(results);
            this.props.onResults(results);
          })
          .catch((error) => {
            console.log("Error was", error);
          });
        break;
      case "website":
        search.getWebsite(this.state.query)
          .then((results) => {
            this.setState({progress: false});
            console.log(results);
            this.props.onResults(results);
          })
          .catch((error) => {
            console.log("Error was", error);
          });
        break;
    }
  }

  onQueryChange = (e) => {
    this.setState({query: e.target.value});
  }

  render() {
    return(
      <Box display="flex" flexDirection="row" width="100%">
        <Box flexGrow={1}>
          <TextField
            variant="outlined"
            fullWidth
            type="search"
            label="Enter a book/journal/report/URL to autofill..."
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
            onClick={this.getResults}
          >
            { this.state.progress ?
              <CircularProgress /> :
              <Search />
            }
          </Button>
        </Box>
      </Box>
    );
  }
}
