import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//EXPORTED FUNCTIONS
import { logout } from '../../ducks/authDuck';
//MATERIAL UI
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddUser from 'material-ui/svg-icons/social/person-add';
import { grey50, grey600 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
//CSS
import IntakeLogo from "../../assets/intakenewlogo.png";

import "./nav.css";


class NavBarTop extends Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind( this )
    }

    handleClick( e ) {
        e.preventDefault();
        this.props.logout();
    }

    render(){
        const toolbarStyle = {
            backgroundColor: "#003044",
            height: 100,
            display: 'flex',
            flexFlow: 'row nowrap',
            width: '100vw'
        }
        const toolbarGroupLeft = {
            marginLeft: 0
        }
        const toolbarGroupRight = {
            marginRight: 20
        }
        const logoutButton = {
            color: grey50,
            border: '1px solid grey50'
        }
        const logoutButtonContent = {
            fontSize: 18,
            fontWeight: 400
        }
        const istyles ={
            marginRight: 25,
            mediumIcon: {
                width: 48,
                height: 48,
                padding: 30
          },

        }

        return(
          <Toolbar style={ toolbarStyle } className="nav-bar-admin">
            <ToolbarGroup firstChild={ true } style={ toolbarGroupLeft }>
                <Link to="/admin">
                    <img alt="javascript logo" className="nav-goldsage-logo" src={ IntakeLogo }/>
                </Link>
            </ToolbarGroup>
            <ToolbarGroup lastChild={true} style={ toolbarGroupRight }>
                <Link to="/admin/adduser">
                    <IconButton>
                        <AddUser color={grey50} style={istyles.mediumIcon}/>
                    </IconButton>
                </Link>
                <Link to="/" onClick={ this.handleClick }>
                    <FlatButton
                        label="LOGOUT"
                        hoverColor={ grey600 }
                        primary={ true }
                        labelStyle={ logoutButtonContent }
                        style={ logoutButton }
                    />
                </Link>
            </ToolbarGroup>
        </Toolbar>

        )
    }
};

const mapStateToProps = state => {
	return {
        isAuthenticated: state.authDuck.isAuthenticated,
        count_messages: state.messageDuck.count_messages
    }
}

export default connect( mapStateToProps, { logout })( NavBarTop );
