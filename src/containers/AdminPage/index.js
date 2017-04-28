//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
//COMPONENTS
import NavBarTop from '../../components/Nav/index';
import AdminMain from '../AdminMain/index';
//CSS
import "./admin.css";

class AdminPage extends Component{

    render(){
        return (
            <div className="AdminPage-main">
                <NavBarTop/>
                <AdminMain/>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return state;
}

export default connect( mapStateToProps, {})( AdminPage );
