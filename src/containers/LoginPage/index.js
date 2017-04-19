import React, { PropTypes } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../../ducks/userDuck'

import Login from '../../components/Login/index'
import CreateUser from '../../components/CreateUser/index'

function LoginPage() {
    return (
      <div>
      <Link to="/">Log in</Link>
      <Link to="/createuser">Sign up</Link>

        <Switch>
          <Route path="/createuser" component={CreateUser}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    );
}

export default connect(state => state, { login })(LoginPage);
