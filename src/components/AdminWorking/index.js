//PACKAGES
import React from 'react';
import { Switch, Route } from 'react-router-dom';
//COMPONENTS
import InputTile from '../InputTile/index';
import Messages from '../Messages/index';
import Welcome from '../Welcome/index';
//CSS
import './adminWorking.css';

export default function AdminWorking () {
    return (
        <div className="adminWorking-main">
            <Switch>
                <Route path="/admin/welcome" component={ Welcome }/>
                <Route exact path="/admin" component={ Messages }/>
                <Route path="/admin/components" component={ InputTile }/>
            </Switch>
        </div>
    )
}
