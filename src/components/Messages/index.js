//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS

//CSS
import "./messages.css";

class Messages extends Component{

    render(){
        return (
            <div className="messages-main">
                <div className="messages-display">
                  <ul>
                    <li>Message 1</li>
                    <li>Message 2</li>
                    <li>Message 3</li>
                    <li>Message 4</li>
                  </ul>
                </div>
                <div className="messages-input">Messages Input</div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( Messages );
