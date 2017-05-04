//PACKAGES
import React from 'react';
import { Switch, Route } from 'react-router-dom';
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
              <Route path="/admin/adduser" component={ CreateUser }/>
              <Route path="/admin" component={ AdminMain }/>

            </Switch>
        </div>
    )
}
