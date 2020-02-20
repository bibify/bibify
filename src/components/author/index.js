import { h, Component } from 'preact';
import style from './style';

import { IconButton, TextField } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';

import { RemoveCircle } from '@material-ui/icons';

export default class Author extends Component {
  remove = () => {
    this.props.onRemove(this.props.index);
  }

	render() {
		return (
      <Box display="flex" flexDirection="row" width="100%" justify="center" alignItems="center">
        { this.props.author.type == "Person" ? (
          <>
            <Box flexGrow={1} className={style.sanemargin} >
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="First Name"
                defaultValue={this.props.author.first}
              />
            </Box>
            <Box flexGrow={1} className={style.sanemargin} >
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="Last Name"
                defaultValue={this.props.author.last}
              />
            </Box>
          </>
        ) : (
          <Box flexGrow={1} className={style.sanemargin} >
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="Name"
                defaultValue={this.props.author.full}
              />
          </Box>
        )
        }
        <Box justify="center" alignItems="center">
          <IconButton onClick={this.remove}>
            <RemoveCircle />
          </IconButton>
        </Box>
      </Box>
		);
	}
}

// import { h } from 'preact';
// import style from './style';
//
// const Home = () => (
// 	<div class={style.home}>
// 		<h1>Home</h1>
// 		<p>This is the Home component.</p>
// 	</div>
// );
//
// export default Home;
