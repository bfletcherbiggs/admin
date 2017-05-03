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
        // primary1Color: "#0E4341",
        // primary1Color: "#032434",
        // accent1Color: pinkA200,
        // accent2Color: grey100,
        // accent3Color: grey500,
        // textColor: darkBlack,
        // alternateTextColor: white,
        // canvasColor: white,
        // borderColor: grey300,
        // disabledColor: fade(darkBlack, 0.3),
        // pickerHeaderColor: cyan500,
        // clockCircleColor: fade(darkBlack, 0.07),
        // shadowColor: fullBlack,
    },
    // flatButton: {
      // color: this.palette.primary1Color,
      // textColor: white

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
