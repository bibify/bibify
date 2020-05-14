import { h, Component } from 'preact';
import { Divider, TextField } from '@material-ui/core';
import axios from 'axios';

import { BookForm, WebsiteForm, DefaultForm } from './forms';
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

    switch (this.props.type) {
      case "book":
        form = (
          <BookForm
            result={this.props.result}
            onDataChange={this.onChange}
          />
        );
        break;
      case "webpage":
        form = (
          <WebsiteForm
            result={this.props.result}
            onDataChange={this.onChange}
          />
        );
        break;
    }

    return form;
  }
}
