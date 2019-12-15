import { h, Component } from 'preact';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import style from './style';

export default class SearchBar extends Component {
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
          <Button className={style.fullbtn} variant="contained" edge="start" color="primary" disableElevation>
            <Search />
          </Button>
        </Box>
      </Box>
    );
  }
}
