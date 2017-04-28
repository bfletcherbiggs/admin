//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
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

export default connect( state => state, {})( InputTile );
