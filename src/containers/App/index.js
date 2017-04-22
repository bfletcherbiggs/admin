import React, {Component} from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import LoginPage from '../LoginPage/index';
import AdminPage from '../AdminPage/index';
import MessagePage from '../MessagePage/index';
import RoomsContainer from '../RoomsContainer/index';
import { checkUserAuth } from '../../ducks/userDuck'
// import "../../ducks/userDuck";
import "./App.css";


class App extends Component{

    render(){

        const{
            isAuthenticated
        } =  this.props

        const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={props => (
                isAuthenticated?
                <Component {...props}/>
                : <Redirect to="/"/>
            )}/>
        )

        return (
            <div className="app">
                <div className="top-bar-right">
                    <Switch>
                        <Route exact path="/" component={LoginPage}/>
                        <PrivateRoute path="/admin" component={AdminPage}/>
                        <PrivateRoute path="/messages" component={RoomsContainer}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

injectTapEventPlugin( );

const mapStateToProps = (state => {
    return {
        isAuthenticated: state.loginDuck.isAuthenticated
    }
});

export default connect(mapStateToProps, { checkUserAuth })(App);
