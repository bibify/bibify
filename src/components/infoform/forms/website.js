import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import axios from 'axios';

import config from '../../../../config.json';
import style from '../style';

export class WebsiteForm extends Component {
  state = {
    fields: []
  }

  onChange = (e) => {
    this.state[e.target.id] = e.target.value;
    this.props.onStateChange(this.state);
    console.log("state schange");
  }

  render() {
    let fields = [];

    for (let field of this.state.fields) {
      fields.push(
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id={field.field}
          label={field.label}
          value={this.state[field.field]}
          onChange={this.onChange}
        />
      );
    }

    return (
      <div>
        <h2>Website</h2>
        <Divider />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="book"
          label={field.label}
          value={this.state[field.field]}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id={field.field}
          label={field.label}
          value={this.state[field.field]}
          onChange={this.onChange}
        />
        <br />
        {fields}
        <br />
      </div>
    );
  }
}
