import { h, Component } from 'preact';

import { Card, CardContent, CardActions } from '@material-ui/core';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import { SvgIcon, Typography } from '@material-ui/core';

import style from './style';

export default class BaseCiteCard extends Component {
  state = {
    styleIndex: 0,
    styleName: "MLA"
  }

  styles = ["MLA", "APA"];

  handleStyleChange = (e, v) => {
    this.setState({styleIndex: v, styleName: styles[v]});
    console.log(this.state.styleIndex);
    this.props.onStyleChange(this.styleIndex, this.styleName);
  }

  render() {
    return (
      <Card className={style.citecard}>
        <CardContent>
          <Typography variant="body1" color="textPrimary">{this.props.text}</Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <SvgIcon>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
              </svg>
            </SvgIcon>
          </IconButton>
          <Tabs value={this.state.styleIndex} onchange={this.handleStyleChange}>
            <Tab value={0} label="MLA" />
            <Tab value={1} label="APA" />
          </Tabs>
        </CardActions>
      </Card>
    );
  }
};
