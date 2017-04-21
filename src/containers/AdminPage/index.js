import React from "react";
import {connect} from "react-redux";
import "./admin.css";
import {login} from '../../ducks/userDuck'
import {logout} from '../../ducks/userDuck'
import NavBarTop from '../../components/Nav/index'

export function AdminPage(props) {

    return (
        <div>
            <NavBarTop/>
            <h3>You are logged in</h3>
        </div>
    );

}

function mapStateToProps(state) {
    return {isAuthenticated: state.loginDuck.isAuthenticated};
}

export default connect(mapStateToProps, {login, logout})(AdminPage);
