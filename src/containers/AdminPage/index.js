import React, { Component } from "react";
import { connect } from "react-redux";
import NavBarTop from '../../components/Nav/index';
import { Switch, Route, Link } from 'react-router-dom';
import CreateUser from '../../components/CreateUser/index';
//CSS
import "./admin.css";

class AdminPage extends Component{

    render(){
        return (
            <div>
                <NavBarTop/>
                <Switch>
                    <Route exact path="/admin" render={()=>(
                        <Link to="/admin/createuser">
                            <button>Create New User</button>
                        </Link>
                    )} />
                    <Route path="/admin/createuser" component={ CreateUser }/>
                </Switch>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return { isAuthenticated: state.authDuck.isAuthenticated };
}

export default connect( mapStateToProps, {})( AdminPage );
