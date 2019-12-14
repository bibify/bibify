import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { lazily, cancelLazily } from '../../lib/lazily';

import Header from './header';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  state = {
    value: 0
  }

	handleRoute = e => {
		this.currentUrl = e.url;
	};


  /** Gets fired when we change tabs.
   ** Will automatically pass on this information to components.
   * @param {int} value - the new value of the tab.
   */
  navCallback = (v) => {
    this.setState({ value: v });
    console.log("claba");
  };

  //load = () => {
  //  stylesheets = ["https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  //    "https://fonts.googleapis.com/icon?family=Material+Icons"];
  //  scripts = [];
  //  this.lazy = lazily(() => {
  //    let head = document.head || document.querySelector('head');

  //    for (let sheet of stylesheets) {
  //      let link = document.createElement("link");
  //      link.rel = "stylesheet";
  //      link.href = sheet;
  //      head.appendChild(link);
  //    }

  //    for (let script of scripts) {
  //      let s = document.createElement("link");
  //      s.src = script;
  //      head.appendChild(s);
  //    }
  //  });
  //};

	render() {
		return (
			<div id="app">
				<Header callback={this.navCallback} />
				<Router onChange={this.handleRoute}>
					<Home path="/" navValue={this.state.value} />
					<Profile path="/profile/" user="me" navValue={this.state.value} />
					<Profile path="/profile/:user" navValue={this.state.value} />
				</Router>
			</div>
		);
	}
}

