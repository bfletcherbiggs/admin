//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS
import NavBarTop from '../../components/Nav/index';
import AdminMain from '../AdminMain/index';
//CSS
import "./admin.css";

class AdminPage extends Component{

    render(){
        return (
            <div className="AdminPage-main">
                <NavBarTop/>
                <AdminMain/>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( AdminPage );

{/* <Switch>
    <Route exact path="/admin" render={()=>(
        <Link to="/admin/createuser">
            <button>Create New User</button>
        </Link>
    )} />
    <Route path="/admin/createuser" component={ CreateUser }/>
</Switch> */}
