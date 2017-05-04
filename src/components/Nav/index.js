import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//EXPORTED FUNCTIONS
import { logout } from '../../ducks/authDuck';
//MATERIAL UI
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddUser from 'material-ui/svg-icons/social/person-add';
import { grey50 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
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
            color: '#003044',
            borderColor: grey50,
            borderWidth: 2,
            borderStyle: 'solid',

        }
        const logoutButtonContent = {
            fontSize: 18,
            fontWeight: 400,
            color: grey50,
            padding: '15px'
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
                    <IconButton className="nav-bar-create-user">
                        <AddUser
                            color={ grey50 }
                        />
                    </IconButton>
                </Link>
                <Link to="/" onClick={ this.handleClick }>
                    <RaisedButton
                        label="LOGOUT"
                        labelStyle={ logoutButtonContent }
                        buttonStyle={ logoutButton }
                        backgroundColor={ '#003044' }
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
