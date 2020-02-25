import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import axios from 'axios';

import config from '../../../../config.json';
import style from '../style';

export class DefaultForm extends Component {
  state = {
    fields: []
  }

  constructor(props) {
    super(props);

    console.log(this.props);
    axios.get(config.bibserverURL + "/api/fields/" + this.props.type)
      .then((res) => {
        console.log("fields", res);
        this.setState({fields: res.data});
      })
      .catch((err) => {
        console.log("Styles fetch failed:", err);
      });
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
        <Divider />
        <br />
        {fields}
        <br />
      </div>
    );
  }
}
