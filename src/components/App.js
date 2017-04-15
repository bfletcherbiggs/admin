import React from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';


import "./App.css";

import router from "../router";

export function App( { children } ) {
	return (
		<div className="app">
			{/* <Nav /> */}
			{ router }
		</div>
	);
}

injectTapEventPlugin();

export default App;
