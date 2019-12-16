import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import style from './style';

export default class WebsiteInfo extends Component {
  static defaultProps = {
    title: "",
    publisher: "",
    url: "",
    sitename: "",
  }

  state = {
    title: this.props.title,
    publisher: this.props.publisher,
    url: this.props.url,
    sitename: this.props.sitename
  }

  onChange = (e) => {
    this.state[e.target.id] = e.target.value;
    this.props.onStateChange(this.state);
    console.log("state schange");
  }

  render() {
    return (
      <div>
        <h3 style="margin-bottom: 0.25em;">Website</h3>
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
          id="sitename"
          label="Website Name"
          value={this.state.sitename}
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
          id="url"
          label="URL"
          value={this.state.url}
          onChange={this.onChange}
        />
        <br />
      </div>
    );
  }
}
