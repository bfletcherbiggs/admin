//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Route } from 'react-router-dom';
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
                  <Route path="/admin" component={ Messages }/>
              </Switch>
            </div>
        )
    }

}

export default connect( state => state, {})( AdminWorking );
