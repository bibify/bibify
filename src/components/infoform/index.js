import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import axios from 'axios';

import { BookForm, WebsiteForm, DefaultForm } from './forms';
import config from '../../../config.json';
import style from './style';

export default class InfoForm extends Component {
  state = {
    result: {}
  }

  timeout = null;

  onChange = (data) => {
    this.setState({result: data})

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.onDataChange(data);
    }, 1000);

  }

  render() {
    return (
      <BookForm
        result={this.props.result}
        onDataChange={this.onChange}
      />
    );
  }
}
