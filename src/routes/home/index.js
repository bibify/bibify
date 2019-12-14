import { h, Component } from 'preact';
import style from './style';

import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { TextField } from '@material-ui/core';

export default class Home extends Component {
	// gets called when this route is navigated to

	// Note: `user` comes from the URL, courtesy of our router
	render() {
    // NOTE: We will have to change this later maybe
    // TODO: find a way to not hardcode it
    let list_of_tabs = ["Book", "Website", "Journal", "Report"];
    let list_of_mediums = ["book title", "URL", "journal title", "report title"];
		return (
      <div id="home" class={style.home}>
        <Grid container direction="row" justify="center">
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing="0"
            lg="6"
            md="9"
            sm="12"
          >
            <h1>Bibify - Cite {list_of_tabs[this.props.navValue]} in MLA Format</h1>
            <TextField variant="outlined" fullWidth label="Enter a book/journal/report/URL to autofill..." />
          </Grid>
        </Grid>
      </div>
		);
	}
}

// import { h } from 'preact';
// import style from './style';
//
// const Home = () => (
// 	<div class={style.home}>
// 		<h1>Home</h1>
// 		<p>This is the Home component.</p>
// 	</div>
// );
//
// export default Home;
