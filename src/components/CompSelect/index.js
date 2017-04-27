//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
//COMPONENTS

//CSS
import "./compSelect.css";

class CompSelect extends Component{

    render(){
        return (
            <div className="compSelect-main">
                <div className="compSelect-status">
                    Component Select
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( CompSelect );
