import { h, Component } from 'preact';

import { Card, CardContent, CardActions, CardMedia } from '@material-ui/core';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import { SvgIcon, Typography, Tooltip } from '@material-ui/core';
import { Avatar, Divider, Box, Collapse, Button } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';

import style from './style';
import {makeStyles} from '@material-ui/core/styles';

export default class ResultCard extends Component {
  state = {
    open: false,
    currentItemIndex: 0,
    currentItem: {
      thumbnail: "/picture.jpeg",
      title: "",
      author: "",
      date: 0,
      publisher: ""
    }
  }

  results = this.props.results;

  useThumbStyle = makeStyles(theme => ({
    thumb: {
      width: theme.spacing(7),
      height: theme.spacing(9)
    },
    clickable: {
      textDecoration: "none",
      color: "#1976D2"
    }
  }));

  toggleResultList = () => {
    this.setState({open: !this.state.open});
  }

  changeCurrentItem = (index) => {
    this.setState({
      currentItemIndex: index,
      currentItem: this.results[index]
    });
  }

  render() {
    this.results = this.props.results;
    for (let result = 0; result < this.results.length; ++result) {
      if (this.results[result].thumbnail == null) this.results[result].thumbnail = "/picture.jpeg";
    }

    if (this.state.currentItem.title == "" && this.results.length > 0) {
      this.setState({currentItem: this.results[0]});
    }
    console.log("results", this.results)

    const thumbstyle = this.useThumbStyle();

    let resultComponents = [];
    for (let i = 0; i < this.results.length; ++i) {
      if (i == this.state.currentItemIndex) continue;
      resultComponents.push(
        <ListItem button onClick={() => this.changeCurrentItem(i)}>
          <ListItemText
            primary={this.results[i].title}
            secondary={`${this.results[i].author}, ${this.results[i].date} \u00B7 ${this.results[i].publisher}`}
          />
        </ListItem>
      );
    }

    let showMoreResults = this.results.length > 1 ? (
      <a href="#" onClick={this.toggleResultList} className={thumbstyle.clickable}>
        {this.state.open ? " Hide" : " Show"}&nbsp;Other&nbsp;Results
      </a>
    ) : <div />;

    return (
      <Card className={style.resultcard}>
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar
              src={this.state.currentItem.thumbnail}
              variant="rounded"
              className={thumbstyle.thumb}
            />
            <Box display="flex" flexDirection="column" paddingLeft="1em;" >
              <Typography variant="h5">{this.state.currentItem.title}</Typography>
              <Typography variant="subtitle1" className={style.smallspace}>
                {this.state.currentItem.author}, {this.state.currentItem.date} &middot;&nbsp;
                {this.state.currentItem.publisher}
              </Typography>
              {showMoreResults}
            </Box>
          </Box>
          <Collapse in={this.state.open}>
            <br />
            <Divider />
            <List>
              {resultComponents}
            </List>
          </Collapse>
        </CardContent>
      </Card>
    );
  }
};
