import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import store from "./store";
import App from "./containers/App/index";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
