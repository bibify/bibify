import { h, createRef, Component } from 'preact';
import style from './style';

import { IconButton, TextField } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';

import { AddCircle, Person, Domain } from '@material-ui/icons';

export default class AddAuthor extends Component {
  state = {
    firstNameValue: "",
    lastNameValue: "",
    fullNameValue: "",
    isPerson: true
  }

  _handleFirstNameChange = (e) => {
    this.setState({firstNameValue: e.target.value})
  }

  _handleLastNameChange = (e) => {
    this.setState({lastNameValue: e.target.value})
  }

  _handleFullNameChange = (e) => {
    this.setState({fullNameValue: e.target.value})
  }

  togglePerson = () => {
    this.setState({isPerson: !this.state.isPerson});
  }

  addAuthor = () => {
    let author = {};
    if (this.state.isPerson) {
      author.type = "Person";
      author.full = this.state.firstNameValue + " " + this.state.lastNameValue;
      author.first = this.state.firstNameValue;
      author.last = this.state.lastNameValue;
    } else {
      author.type = "Other";
      author.full = this.state.fullNameValue;
    }

    this.props.onAdd(author);
    this.setState({firstNameValue: "",
      lastNameValue: "", fullNameValue: ""});
  }

	render() {
		return (
      <Box display="flex" flexDirection="row" width="100%" justify="center" alignItems="center">
        { this.state.isPerson ?
          <>
            <Box flexGrow={1} className={style.sanemargin} >
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                id="nameFirst"
                label="First Name"
                type="string"
                value={this.state.firstNameValue || ""}
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
                value={this.state.lastNameValue || ""}
                onChange={this._handleLastNameChange}
              />
            </Box>
            <Box justify="center" alignItems="center">
              <IconButton onClick={this.togglePerson}>
                <Person />
              </IconButton>
              <IconButton onClick={this.addAuthor}>
                <AddCircle />
              </IconButton>
            </Box>
          </> :
          <>
            <Box flexGrow={1} className={style.sanemargin} >
              <TextField
                fullWidth
                margin="dense"
                variant="outlined"
                id="nameFull"
                label="Full Name"
                type="string"
                value={this.state.fullNameValue || ""}
                onChange={this._handleFullNameChange}
              />
            </Box>
            <Box justify="center" alignItems="center">
              <IconButton onClick={this.togglePerson}>
                <Domain />
              </IconButton>
              <IconButton onClick={this.addAuthor}>
                <AddCircle />
              </IconButton>
            </Box>
          </>
        }
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
