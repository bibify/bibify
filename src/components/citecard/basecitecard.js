import { h, Component } from 'preact';

import { Card, CardContent, CardActions } from '@material-ui/core';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import { SvgIcon, Typography, Tooltip, Snackbar } from '@material-ui/core';

import style from './style';

export default class BaseCiteCard extends Component {
  state = {
    styleIndex: 0,
    styleName: "MLA"
  };

  handleStyleChange = (e, v) => {
    this.setState({styleIndex: v, styleName: this.props.styles[v].citationName});
    this.props.onStyleChange(v, this.props.styles[v].citationName);
  }

  render() {
    let styleTabs = [];

    for (let style = 0; style < Math.min(3, this.props.styles.length); style++) {
      if (this.props.styles[style].citationShortName != null) {
        console.log(this.props.styles[style].citationShortName);
        styleTabs.push(<Tab value={parseInt(style)} label={this.props.styles[style].citationShortName} />);
      } else {
        console.log(this.props.styles[style].citationName);
        styleTabs.push(<Tab value={parseInt(style)} label={this.props.styles[style].citationName} />);
      }
    }

    return (
      <Card className={style.citecard}>
        <CardContent>
          <Typography variant="body1" color="textPrimary">{this.props.text}</Typography>
        </CardContent>
        <CardActions>
          <Tooltip title="Copy">
            <IconButton>
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
      </Card>
    );
  }
};
