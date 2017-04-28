//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
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

export default connect( state => state, {})( Views );
