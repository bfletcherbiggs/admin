//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
//CSS AND ASSETS
import './welcome.css';
//TODO Remove these
import adminImg from '../../assets/goldsageAvatar.png';


class Welcome extends Component{

    render(){

        const {
            user,
            count_messages
        } = this.props;

        return (
            <div className="welcome-main">
                <h2>
                    Welcome Back
                </h2>
                <h1>
                    {user.firstname + ' ' + user.lastname }
                </h1>
                <img src={ adminImg } alt="Admin Avatar"/>
                <h3>
                    You have { count_messages[ 0 ] } message to review.
                </h3>
                <h3>
                    Please select a user from the left to begin, or create a new user by clicking on the icon to the left of the Logout Button
                </h3>
                <Row className="welcome-container">
                    <Col xs={ 12 }>
                    </Col>
                </Row>
            </div>
        )
    }
}



const mapStateToProps = state => {
    return {
        user: state.authDuck.user,
        count_messages: state.messageDuck.count_messages
    }
}

export default withRouter( connect( mapStateToProps, {} )( Welcome ) )
