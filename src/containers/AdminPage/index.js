//PACKAGES
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
//COMPONENTS
import NavBarTop from '../../components/Nav/index';
import AdminMain from '../AdminMain/index';
import CreateUser from '../../components/CreateUser/index'
//CSS
import './admin.css';

export default function AdminPage () {
    return (
        <div className="AdminPage-main">
            <NavBarTop/>
            <Switch>
              <Route exact path="/admin" component={ AdminMain }/>
              <Route path="/admin/adduser" component={ CreateUser }/>
            </Switch>
        </div>
    )
}
