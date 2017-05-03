import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//EXPORTED FUNCTIONS
import { logout } from '../../ducks/authDuck';
//MATERIAL UI
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/communication/message';
import Profile from 'material-ui/svg-icons/action/account-circle';
import WatsonIcon from 'material-ui/svg-icons/action/fingerprint';
import { grey50 } from 'material-ui/styles/colors';
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
        this.props.logout()
        e.preventDefault();
    }

    componentDidMount() {
        // const badge = ReactDOM.findDOMNode( this.refs.badge )
        // // badge.style.paddingRight = '12px'
    }

    render(){
        const {
            count_messages
        }
        = this.props

        const badgeCount = () =>{
            return count_messages[0]
        }

        const badgeStyle = ()=>{
            return ( count_messages[ 0 ] )?
            { top: 12, right: 6 }
            :{ top: 24, right: 24,display:'none' }
        }

        return(
          <Toolbar style={ { backgroundColor: '#003044', height: 80 } }>
            <ToolbarGroup firstChild={ true }>
                <Link to="/admin">
                    <img alt="javascript logo" className="nav-goldsage-logo" src={ IntakeLogo }/>
                </Link>
            </ToolbarGroup>
            <ToolbarGroup lastChild={true} >
                <Link to="/" onClick={ this.handleClick }>
                    <FlatButton
                        label="LOGOUT"
                        primary={ true }
                        labelStyle={ { grey50 } }
                        style={ { color: grey50 } }
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
