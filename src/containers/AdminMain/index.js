//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS
import Users from '../../components/Users/index';
import Views from '../../components/Views/index';
//CSS
import "./adminMain.css";

class AdminMain extends Component{

    render(){
        return (
            <div className="adminMain-main">
                <div className="adminMain-selectedUser">Selected User</div>
                <div className="adminMain-working">
                    <div className="adminMain-users"><Users/></div>
                    <div className="adminMain-views"><Views/></div>
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( AdminMain );
