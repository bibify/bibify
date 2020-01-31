import { h, Component } from 'preact';
import style from './style';
import SearchBar from '../../components/searchbar';
import Author from '../../components/author';
import AddAuthor from '../../components/add-author';
import WebsiteInfo from '../../components/websiteinfo';
import Header from '../../components/header';
import CiteCard from '../../components/citecard';
import ResultCard from '../../components/resultcard';

import { Divider, Collapse } from '@material-ui/core';
import { Grid } from '@material-ui/core';

export default class Home extends Component {
  state = {
    headerData: {
      value: 0,
      tabName: "Book",
      supported: true
    },
    authors: [
    ],
    showResults: false,
    results: [
    ]
  }

  /** Gets fired when we change tabs.
   ** Will automatically pass on this information to components.
   * @param {int} value - the new value of the tab.
   * @param {int} tabName - the name of the new tab.
   * @param {boolean} supported - whether the new tab citation style can be searched for.
   */
  navCallback = (value, tabName, supported) => {
    this.setState({headerData: { value: value, tabName: tabName, supported: supported }});
    console.log("claba");
  };

  onInfoChange = (info) => {
    this.setState({srcInfo: info})
    console.log(this.state);
  }

  onResults = (results) => {
    console.log("res", results);
    this.setState({showResults: true, results: results});
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
				<Header onTabChange={this.navCallback} />
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
            <h1>Bibify - Cite {this.state.headerData.tabName} in MLA Format</h1>
            <Collapse in={this.state.headerData.supported} className={style.citecard}>
              <SearchBar onResults={this.onResults} />
            </Collapse>
            <br />
            <Collapse in={this.state.showResults} className={style.citecard}>
              <ResultCard
                results={this.state.results}
              />
            </Collapse>
            <br />
            <CiteCard text="Your citation will appear here..." />
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
