import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../ducks/userDuck';
import Login from '../../components/Login/index';

function LoginPage( ) {
    return (
        <div>
            <Login></Login>
        </div>
    );
}

export default connect(state => state, { login })( LoginPage );
