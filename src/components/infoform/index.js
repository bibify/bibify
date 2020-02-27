import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import axios from 'axios';

import { BookForm, WebsiteForm, DefaultForm } from './forms';
import config from '../../../config.json';
import style from './style';

export default class InfoForm extends Component {
  state = {
    result: {authors: []}
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
    let form = (
      <DefaultForm
        result={this.props.result}
        onDataChange={this.onChange}
      />
    );

    if (this.props.type == "book") {
      form = (
        <BookForm
          result={this.props.result}
          onDataChange={this.onChange}
        />
      );
    } else if (this.props.type == "website") {
      form = (
        <WebsiteForm
          result={this.props.result}
          onDataChange={this.onChange}
        />
      );
    }

    return form;
  }
}
