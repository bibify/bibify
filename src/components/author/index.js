import { h, Component } from 'preact';
import style from './style';

import { IconButton, TextField } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';

import { RemoveCircle } from '@material-ui/icons';

export default class Author extends Component {
  state = {
    mode: "Person",
    index: this.props.index,
    author: this.props.author
  }

  timeout = null;

  handleChange = (e) => {
    let author = {...this.state.author};
    author[e.target.id] = e.target.value;
    this.setState({author: author});

    clearTimeout(this.timeout);
    setTimeout(timeout, () => {
      this.props.onAuthorChange(author);
    });
  }

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
                id="first"
                value={this.state.author.first}
                onChange={this.handleChange}
              />
            </Box>
            <Box flexGrow={1} className={style.sanemargin} >
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                label="Last Name"
                id="last"
                value={this.state.author.last}
                onChange={this.handleChange}
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
                id="full"
                value={this.state.author.full}
                onChange={this.handleChange}
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
