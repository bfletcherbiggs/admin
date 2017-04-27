//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';
//COMPONENTS
import InputTile from '../InputTile/index';
import Messages from '../Messages/index';
//CSS
import "./adminWorking.css";

class AdminWorking extends Component{

    render(){
        return (
            <div className="adminWorking-main">
              <Switch>
                  <Route exact path="/admin/components" component={ InputTile }/>
                  <Route path="/admin/messages" component={ Messages }/>
              </Switch>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return { state };
}

export default connect( mapStateToProps, {})( AdminWorking );
