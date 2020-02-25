import { h, Component } from 'preact';
import { Router } from 'preact-router';

import { lazily, cancelLazily } from '../../lib/lazily';


// Code-splitting is automated for routes
import Home from '../routes/home';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  state = {
    headerData: { value: 0, tabName: "Book" }
  }

	handleRoute = e => {
		this.currentUrl = e.url;
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
				<Router onChange={this.handleRoute}>
					<Home path="/" />
				</Router>
			</div>
		);
	}
}

