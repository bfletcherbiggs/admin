//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS
import CompSelect from "../CompSelect/index"
import CompDisplay from "../CompDisplay/index"
//CSS
import "./inputTile.css";

class InputTile extends Component{

    render(){
        return (
            <div className="inputTile-main">
                <div className="inputTile-compSelect">
                    <CompSelect/>
                </div>
                <div className="inputTile-compDisplay">
                    <CompDisplay/>
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( InputTile );
