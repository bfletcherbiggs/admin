import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//EXPORTED FUNCTIONS
import { logout } from '../../ducks/authDuck';
//MATERIAL UI
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import AddClientIcon from 'material-ui/svg-icons/social/person-add';
import Profile from 'material-ui/svg-icons/action/account-circle';
import { grey50 } from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
//CSS

import IntakeLogo from "../../assets/intakelogo.png";
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

    render(){

        return(
            <div>
                <Toolbar style={ { backgroundColor: '#003044', height: 85 } }>
              <ToolbarGroup firstChild={ true }>
                  <Link to="/client">
                      <img alt="javascript logo" className="nav-goldsage-logo" src={ IntakeLogo }/>

                  </Link>
              </ToolbarGroup>
              <ToolbarGroup>
                      <Link to="/addclient">
                          <IconButton >
                              <AddClientIcon color={ grey50 }/>
                    </IconButton>
                      </Link>
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
            </div>
        )
    }
};

function mapStateToProps( state ) {
	return {
        isAuthenticated: state.authDuck.isAuthenticated,
        count_messages: state.messageDuck.count_messages
    };
}

export default connect( mapStateToProps, {logout})( NavBarTop );
