import { h, Component } from 'preact';
import { createRef } from 'preact';

import { Card, CardContent, CardActions, Button } from '@material-ui/core';
import { IconButton, Tab, Tabs, Divider } from '@material-ui/core';
import { SvgIcon, Typography, Tooltip, Snackbar, LinearProgress, Collapse } from '@material-ui/core';

import StyleChooser from './stylechooser';
import style from './style';

export default class BaseCiteCard extends Component {
  state = {
    styleIndex: 0,
    styleName: "MLA",
    showChooser: false
  };

  constructor(props) {
    super(props);
    this.citation = createRef();
  }

  handleStyleChange = (e, v) => {
    if (v == 3) {
      this.setState({showChooser: !this.state.showChooser})
    } else {
      this.setState({styleIndex: v, styleName: this.props.styles[v].citationName, showChooser: false});
      this.props.onStyleChange(this.props.styles[v]);
    }
  }

  onStyleChooserSelect = (style) => {
    this.setState({styleIndex: 0, styleName: style.citationName, showChooser: false});
    this.props.onStyleChooserSelect(style);
  }

  copyToClipboard = (e) => {
    let range = document.createRange();
    range.selectNode(this.citation.current);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
  }

  render() {
    let styleTabs = [];

    if (this.props.styles.length >= 3) {
      for (let style = 0; style < 3; style++) {
        if (this.props.styles[style].citationShortName != null) {
          console.log(style, this.props.styles[style]);
          styleTabs.push(<Tab value={parseInt(style)} label={this.props.styles[style].citationShortName} />);
        } else {
          styleTabs.push(<Tab value={parseInt(style)} label={this.props.styles[style].citationName.split(" ")[0]} />);
        }
      }

      styleTabs.push(
        <Tab
          value="3"
          label={this.state.showChooser ? "Less..." : "More..."}
        />
      );
    }

    return (
      <Card className={style.citecard}>
        <CardContent>
          { this.props.progress ?
            <LinearProgress/> :
            <div ref={this.citation} dangerouslySetInnerHTML={{ __html: this.props.content }} />
          }
        </CardContent>
        <CardActions>
          <Tooltip title="Copy">
            <IconButton onClick={this.copyToClipboard}>
              <SvgIcon>
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="#000000" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                </svg>
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tabs value={this.state.styleIndex} onChange={this.handleStyleChange}>
            {styleTabs}
          </Tabs>
        </CardActions>
        <Collapse in={this.state.showChooser}>
          <Divider />
          <StyleChooser
            onStyleSelect={this.onStyleChooserSelect}
          />
        </Collapse>
      </Card>
    );
  }
};
