import { h, Component } from 'preact';
import style from './style';
import SearchBar from '../../components/searchbar';
import Author from '../../components/author';
import AddAuthor from '../../components/add-author';
import WebsiteInfo from '../../components/websiteinfo';
import Header from '../../components/header';
import CiteCard from '../../components/citecard';

import { Button, IconButton, TextField } from '@material-ui/core';
import { FormLabel, FormGroup, Divider } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Card, CardContent, CardActions } from '@material-ui/core';
import { SvgIcon } from '@material-ui/core';

import { RemoveCircle } from '@material-ui/icons';

export default class Home extends Component {
  state = {
    authors: [
      {firstName: "Adolf", lastName: "Hitler"}
    ],
  }

  /** Gets fired when we change tabs.
   ** Will automatically pass on this information to components.
   * @param {int} value - the new value of the tab.
   * @param {int} tabName - the name of the new tab.
   */
  navCallback = (value, tabName) => {
    this.setState({headerData: { value: value, tabName: tabName }});
    console.log("claba");
  };

  onInfoChange = (info) => {
    this.setState({srcInfo: info})
    console.log(this.state);
  }

  addAuthor = (nameFirst, nameLast) => {
    console.log("received addAuthor");
    const authors_cp = this.state.authors;
    authors_cp.push({firstName: nameFirst, lastName: nameLast});
    this.setState({authors: authors_cp});
  }

  removeAuthor = (index) => {
    const authors_cp = this.state.authors;
    authors_cp.splice(index, 1);
    this.setState({authors: authors_cp});
  }

	render() {
    // NOTE: We will have to change this later maybe
    // TODO: find a way to not hardcode it
    let list_of_tabs = ["Book", "Website", "Journal", "Report"];
    let list_of_mediums = ["book title", "URL", "journal title", "report title"];

    let author_components = [];
    for (let [index, author] of this.state.authors.entries()) {
      author_components.push(<Author
        index={index}
        firstName={author.firstName}
        lastName={author.lastName}
        onRemove={this.removeAuthor}
      />);
    }

		return (
      <div id="home" class={style.home}>
				<Header onTabChange={this.navCallback} className={style.headerbar}/>
        <Grid container direction="row" justify="center">
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={0}
            lg={6}
            md={9}
            sm={12}
          >
            <h1>Bibify - Cite {list_of_tabs[this.props.navValue]} in MLA Format</h1>
            <SearchBar />
            <br />
            <CiteCard text="something something" />
            <br />
            <form className={style.citecard}>
              <WebsiteInfo onStateChange={this.onInfoChange} />
              <h3 style="margin-bottom: 0.25em;">Authors</h3>
              <Divider />
              <br />
              {author_components}
              <AddAuthor onAdd={this.addAuthor} />
            </form>
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
