//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
//COMPONENTS

//CSS
import "./compDisplay.css";

class CompDisplay extends Component{

    render(){
        return (
            <div className="compDisplay-main">
                <div className="compDisplay-display">
                    <ul>
                      <li>Comp 1 Display</li>
                      <li>Comp 2 Display</li>
                      <li>Comp 3 Display</li>
                      <li>Comp 4 Display</li>
                    </ul>
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( CompDisplay );
