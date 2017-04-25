import React from "react";
import { connect } from "react-redux";
import NavBarTop from '../../components/Nav/index'
//CSS
import "./admin.css";

export function AdminPage( props ) {

    return (
        <div>
            <NavBarTop/>
            <h3>You are logged in</h3>
        </div>
    );

}

function mapStateToProps( state ) {
    return { isAuthenticated: state.authDuck.isAuthenticated };
}

export default connect( mapStateToProps, {})( AdminPage );
