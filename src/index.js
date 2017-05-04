import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { checkUserAuth } from './ducks/authDuck';
import './index.css';
import store from './store';
import App from './containers/App/index';

if( localStorage.getItem( 'token' ) ) {
    store.dispatch( checkUserAuth() )
}

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: "#003044",
        accent1Color: "#D67428"
    }
});

ReactDOM.render(
    <BrowserRouter>
        <Provider store={ store }>
            <MuiThemeProvider muiTheme={ muiTheme }>
                <Route path="/" component={ App } />
            </MuiThemeProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById( 'root' )
);
