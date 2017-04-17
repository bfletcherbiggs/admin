import React, {PropTypes} from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link, IndexLink } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// import Login from './components/Login';
import "./App.css";

import router from "../router";

export function App( { children } ) {
	return (
		<div className="app">
			{/* <Nav /> */}
			<div className="top-bar-right">
        <Link to="/login">Log in</Link>
        <Link to="/signup">Sign up</Link>
      </div>
			{ router }
		</div>
	);
}

injectTapEventPlugin();

export default App;
