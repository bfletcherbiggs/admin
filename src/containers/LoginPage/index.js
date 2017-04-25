import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../ducks/authDuck';
import Login from '../../components/Login/index';

function LoginPage( ) {
    return (
        <div>
            <Login></Login>
        </div>
    );
}

export default connect( state => state, { login })( LoginPage );
