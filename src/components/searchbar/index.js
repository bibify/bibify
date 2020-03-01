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
            this.setState({progress: false});
            this.props.showBanner("error", "Failed to get results: " + error + ". Please try again later.");
          });
        break;
      case "webpage":
        // Make sure URL is valid
        if (!(this.state.query.startsWith("http://") || this.state.query.startsWith("https://"))) {
          this.props.showBanner("error", "URL must start with http:// or https://.");
          break;
        }

        search.getWebsite(this.state.query)
          .then((results) => {
            this.setState({progress: false});
            console.log(results);
            this.props.onResults(results);
          })
          .catch((error) => {
            console.log("Error was", error);
            this.setState({progress: false});
            this.props.showBanner("error", "Failed to get results: " + error + ". Please try again later.");
          });
        break;
    }
  }

  onQueryChange = (e) => {
    this.setState({query: e.target.value});
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.getResults();
    }
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
            onKeyPress={this.handleKeyPress}
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
