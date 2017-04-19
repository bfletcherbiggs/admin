import React, { PropTypes } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../../ducks/userDuck'

import Login from '../../components/Login/index'
import SignUp from '../../components/SignUp/index'

function LoginPage() {
    return (
      <div>
      <Link to="/">Log in</Link>
      <Link to="/signup">Sign up</Link>

        <Switch>
          <Route path="/signup" component={SignUp}/>
          <Route path="/" component={Login}/>
        </Switch>
      </div>
    );
}

export default connect(state => state, { login })(LoginPage);
