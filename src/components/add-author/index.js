import { h, createRef, Component } from 'preact';
import style from './style';

import { IconButton, TextField } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';

import { AddCircle } from '@material-ui/icons';

export default class AddAuthor extends Component {
  state = {
    firstNameValue: "",
    lastNameValue: ""
  }

  _handleFirstNameChange = (e) => {
    this.setState({firstNameValue: e.target.value})
  }

  _handleLastNameChange = (e) => {
    this.setState({lastNameValue: e.target.value})
  }

  addAuthor = () => {
    this.props.onAdd(this.state.firstNameValue, this.state.lastNameValue);
    this.setState({firstNameValue: "",
      lastNameValue: ""});
  }

	render() {
		return (
      <Box display="flex" flexDirection="row" width="100%" justify="center" alignItems="center">
        <Box flexGrow={1} className={style.sanemargin} >
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="nameFirst"
            label="First Name"
            type="string"
            value={this.state.firstNameValue}
            onChange={this._handleFirstNameChange}
          />
        </Box>
        <Box flexGrow={1} className={style.sanemargin} >
          <TextField
            fullWidth
            margin="dense"
            variant="outlined"
            id="nameLast"
            label="Last Name"
            type="string"
            value={this.state.lastNameValue}
            onChange={this._handleLastNameChange}
          />
        </Box>
        <Box justify="center" alignItems="center">
          <IconButton onClick={this.addAuthor}>
            <AddCircle />
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
