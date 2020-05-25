import { h, Component } from 'preact';
import { Router } from 'preact-router';


// Code-splitting is automated for routes
import Home from '../routes/home';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  state = {
    headerData: { value: 0, tabName: "Book" },
    show: false
  }

	handleRoute = e => {
		this.currentUrl = e.url;
	};

  componentDidMount() {
    // Quick fix for FOUC; ideally we'd get MUI to
    // load properly but it looks like it doesn't like
    // preact
    this.setState({ show: true });
  }

	render() {
		return ( this.state.show ?
			<div id="app">
				<Router onChange={this.handleRoute}>
					<Home path="/" />
				</Router>
      </div> : <div />
		);
	}
}

