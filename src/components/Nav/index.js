import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/communication/message';
import Profile from 'material-ui/svg-icons/action/account-circle';
import WatsonIcon from 'material-ui/svg-icons/action/fingerprint';
import goldsageLogo from "../../assets/logoforgroupapp.svg";
import { grey50 } from 'material-ui/styles/colors';
import { logout } from '../../ducks/userDuck';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./nav.css";

class NavBarTop extends Component{
    constructor(){
        super();

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e) {
        this.props.logout()
        e.preventDefault();
    }

    render(){

        const tapIcons = (
            <div>
                <IconButton tooltip="Watson chat" >
                    <WatsonIcon color={ grey50 } />
                </IconButton>

                <Badge
                    badgeContent={10}
                    secondary={true}
                    badgeStyle={{top: 12, right: 12}}>

                    <Link to="/messages">
                        <IconButton tooltip="message" >
                            <NotificationsIcon color={grey50}/>
                        </IconButton>
                    </Link>
                </Badge>


                <IconButton  onClick={this.handleClick} tooltip="Logout">
                    <Profile color={grey50} />
                </IconButton>
            </div>
         )

        return(
            <div>
                <AppBar style={ { backgroundColor: '#0E4341' } }
                    iconElementRight={ tapIcons }
                    showMenuIconButton={ false }
                    title={
                        <Link to="/admin">
                            <img
              				    alt="javascript logo"
              					className="nav-goldsage-logo"
              					src={ goldsageLogo }
              				/>
                        </Link>
                    }
                />
            </div>
        )
    }
};

function mapStateToProps(state) {
	return {
        isAuthenticated: state.loginDuck.isAuthenticated
    };
}

export default connect( mapStateToProps, {logout})( NavBarTop );
