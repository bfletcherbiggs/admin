//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS
import CompStatus from '../CompStatus/index';
import AdminWorking from '../AdminWorking/index';
//CSS
import "./views.css";

class Views extends Component{

    render(){
        return (
            <div className="views-main">

                <div className="views-adminWorking"><AdminWorking/></div>
                <br/>
                <div className="views-compStatus"><CompStatus/></div>


            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( Views );
