import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import style from './style';

export default class InfoForm extends Component {
  static defaultProps = {
    title: "",
    publisher: "",
    publishedDate: ""
  }

  state = {
    title: this.props.title,
    publisher: this.props.publisher,
    publishedDate: this.props.publishedDate
  }

  onChange = (e) => {
    this.state[e.target.id] = e.target.value;
    this.props.onStateChange(this.state);
    console.log("state schange");
  }

  render() {
    return (
      <div>
        <h3 style="margin-bottom: 0.25em;">{this.props.type}</h3>
        <Divider />
        <br />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="title"
          label="Title"
          value={this.state.title}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="publisher"
          label="Publisher"
          value={this.state.publisher}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="publishedDate"
          label="Published Date"
          value={this.state.publishedDate}
          onChange={this.onChange}
        />
        <br />
      </div>
    );
  }
}
