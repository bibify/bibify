import { h, Component } from 'preact';

import style from './style';
import SearchBar from '../../components/searchbar';
import Author from '../../components/author';
import AddAuthor from '../../components/add-author';
import InfoForm from '../../components/infoform';
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
    showResults: false,
    results: [
    ],
    selectedResult: {authors: []},
    style: {}
  }

  /** Gets fired when we change tabs.
   ** Will automatically pass on this information to components.
   * @param {int} value - the new value of the tab.
   * @param {int} tabName - the name of the new tab.
   * @param {boolean} supported - whether the new tab citation style can be searched for.
   */
  navCallback = (value, tabName, supported) => {
    this.setState({headerData: { value: value, tabName: tabName, supported: supported}});
    if (this.state.selectedResult == undefined) {
    }
  };

  onInfoChange = (info) => {
    this.setState({selectedResult: info})
  }

  onResults = (results) => {
    this.setState({showResults: true, results: results, selectedResult: results[0]});
  }

  onSelectChange = (result) => {
    this.setState({selectedResult: result});
  }

  onStyleChange = (style) => {
    this.setState({style: style});
  }

  addAuthor = (author) => {
    this.setState((state, props) => {
      let result = {...state.selectedResult};
      let authors = [...result.authors];
      authors.push(author);

      result.authors = authors;

      return {
        selectedResult: result
      };
    });
  }

  changeAuthor = (index, author) => {
    this.setState((state, props) => {
      let result = {...state.selectedResult};
      let authors = [...result.authors];
      authors[index] = author;

      result.authors = authors;
      return {
        selectedResult: result
      };
    });
  }

  removeAuthor = (index) => {
    this.setState((state, props) => {
      let result = {...state.selectedResult};
      let authors = [...result.authors];
      authors.splice(index, 1);

      result.authors = authors;
      return {
        selectedResult: result
      };
    });
  }

	render() {
    let author_components = [];
    for (let [index, author] of (this.state.selectedResult.authors.entries())) {
      author_components.push(<Author
        index={index}
        author={author}
        key={JSON.stringify(author)}
        onChange={this.changeAuthor}
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
              <SearchBar onResults={this.onResults} type={this.state.headerData.tabName.toLowerCase()} />
            </Collapse>
            <br />
            <Collapse in={this.state.showResults} className={style.citecard}>
              <ResultCard
                results={this.state.results}
                onSelectChange={this.onSelectChange}
              />
            </Collapse>
            <br />
            <CiteCard
              text="Your citation will appear here..."
              result={this.state.selectedResult}
              onStyleChange={this.onStyleChange}
            />
            <br />
            <form className={style.citecard}>
              <InfoForm
                result={this.state.selectedResult}
                onDataChange={this.onInfoChange}
                type={this.state.headerData.tabName.toLowerCase()}
              />
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
