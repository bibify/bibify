import { h, Component } from 'preact';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';

//import { MetaProvider } from './providers';
import style from './style';

export default class SearchBar extends Component {
  getResults = () => {
    console.log("Getting results");
    let results = [
      {
        title: "The Manifesto of the Communist Party",
        author: "Karl Marx & Frederich Engels",
        date: 1889,
        publisher: "The International League of Communists yeeeeeeet",
      },
      {
        title: "Das Kapital",
        author: "Karl Marx",
        date: 1918,
        publisher: "The First Communist International",
      }
    ];

    (async () => {
      try {
        const response = await got('https://sindresorhus.com');
        console.log(response.body);
        //=> '<!doctype html> ...'
      } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
      }
    })();

    this.props.onResults(results);
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
            <Search />
          </Button>
        </Box>
      </Box>
    );
  }
}
