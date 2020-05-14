import { h, Component } from 'preact';
import { Divider, TextField, Collapse, Button } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import axios from 'axios';

import style from '../style';

export class WebsiteForm extends Component {
  state = {
    fields: [],
    data: {authors: []},
    showOtherFields: false
  }

  constructor(props) {
    super(props);

    console.log(this.props);
    axios.get(process.env.BIBSERVERURL + "/api/fields/webpage")
      .then((res) => {
        let fields = res.data;
        for (let i = 0; i < fields.length; i++) {
          console.log("field", fields[i].field);
          if (["title", "publisher", "container-title", "date", "accessDate", "url"].indexOf(fields[i].field) != -1) {
            fields.splice(i, 1);
            i--;
          }
        }

        this.setState({fields: fields});
      })
      .catch((err) => {
        console.log("Styles fetch failed:", err);
      });
  }

  onChange = (e) => {
    this.setState((state, props) => {
      let data = { ...state.data };
      data[e.target.id] = e.target.value;
      console.log(data);
      props.onDataChange(data);

      return {
        data: data
      };
    })
  }

  componentDidUpdate(previousProps, previousState, snapshot) {
    if (this.props.result != previousProps.result && this.props.result != undefined) {
      this.setState({data: this.props.result});
    }
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
          value={this.state.data[field.field] || ""}
          onChange={this.onChange}
        />
      );
    }

    return (
      <div>
        <h3>Website</h3>
        <Divider />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="title"
          label="Title"
          value={this.state.data.title || ""}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="URL"
          label="URL"
          value={this.state.data.URL || ""}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="accessDate"
          label="Access Date"
          value={this.state.data.accessDate || ""}
          onChange={this.onChange}
        />
        <br />

        <h3>Publishing Info</h3>
        <Divider />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="container-title"
          label="Website Title"
          value={this.state.data["container-title"] || ""}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="publisher"
          label="Publisher"
          value={this.state.data.publisher || ""}
          onChange={this.onChange}
        />
        <TextField
          className={style.sanemargin}
          fullWidth
          margin="dense"
          variant="outlined"
          id="date"
          label="Publish Date"
          value={this.state.data.date || ""}
          onChange={this.onChange}
        />
        <br />

        <h3>Other Info
          <Button onclick={() => this.setState({showOtherFields: !this.state.showOtherFields})}>
            { this.state.showOtherFields ?
              <ExpandLess /> :
              <ExpandMore />
            }
          </Button>
        </h3>
        <Collapse in={this.state.showOtherFields}>
          <Divider />
          {fields}
        </Collapse>
        <br />
      </div>
    );
  }
}
