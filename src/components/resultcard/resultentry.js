import { h, Component } from 'preact';

import { Card, CardContent, CardActions, CardMedia } from '@material-ui/core';
import { IconButton, Tab, Tabs } from '@material-ui/core';
import { SvgIcon, Typography, Tooltip } from '@material-ui/core';
import { Avatar, Divider, Box, Collapse, Button } from '@material-ui/core';

import { Inbox, StarBorder, ExpandLess, ExpandMore } from '@material-ui/icons';

import style from './style';
import {makeStyles} from '@material-ui/core/styles';

export default class ResultCard extends Component {
  state = {
    open: 0
  }

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

  handleClick = () => {
    this.setState({open: !open});
  }

  render() {
    const thumbstyle = this.useThumbStyle();
    return (
      <Card className={style.resultcard}>
        <CardContent>
          <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar
              src="/picture.jpeg"
              variant="rounded"
              className={thumbstyle.thumb}
            />
            <Box display="flex" flexDirection="column" paddingLeft="1em;" >
              <Typography variant="h5">The Manifesto of the Communist Party</Typography>
              <Typography variant="subtitle1">
                Karl Marx, 1890 &middot;
                Communist League &middot;
                <a href="#" className={thumbstyle.clickable}> More Results</a>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }
};
