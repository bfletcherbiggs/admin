//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS

//CSS
import "./users.css";

class Users extends Component{

    render(){
        return (
            <div className="users-main">
                Users Component
                <ul>
                  <li>User 1</li>
                  <li>User 2</li>
                  <li>User 3</li>
                  <li>User 4</li>
                </ul>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( Users );
