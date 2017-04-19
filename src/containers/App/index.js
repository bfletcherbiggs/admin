import React, {PropTypes} from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link, Switch, Route } from 'react-router-dom';

import "./App.css";

import LoginPage from '../LoginPage/index'

export function App( { children } ) {
	return (
		<div className="app">

			<div className="top-bar-right">
				<Switch>
					<Route path="/greeting" render={() => (
						<div>
							<Link to="/">Log In</Link>
							<Link to="/signup">Sign Up</Link>
						<h1>Hello</h1>
					</div>
					)} />
					<Route path="/" component={LoginPage}/>
				</Switch>
      </div>

		</div>
	);
}

injectTapEventPlugin();

export default App;
