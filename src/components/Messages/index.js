//PACKAGES
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
//LIBRARIES
import moment from 'moment';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import { Row, Col } from 'react-flexbox-grid';
//EXPORTED FUNCTIONS
import { sendMessage } from '../../ducks/messageDuck'
//CSS AND ASSETS
import './messages.css';
//TODO Remove these
import userImg1 from '../../assets/user1.png';
import userImg2 from '../../assets/user2.png';
import userImg3 from '../../assets/user3.png';
import adminImg from '../../assets/goldsageAvatar.png';


const renderTextField = ( { input, label, meta: { touched, error }, ...custom } ) => (
    <TextField
        hintText={ label }
        errorText={ touched && error }
        { ...input }
        { ...custom }
    />
)

class Messages extends Component{
    constructor() {
        super()

        this.state = {
            message:''
        }

        this.handleSubmit = this.handleSubmit.bind( this )
    }

    handleSubmit( e ) {
        this.props.sendMessage(
            this.props.currentchat[ 0 ].admin_id,
            this.props.currentchat[ 0 ].user_id,
            this.state.message,
            this.props.activeRoomIndex
        )
        e.preventDefault()
    }

    handleChange( field, e ) {
        this.setState( { [ field ] : e.target.value } )
    }

    componentDidUpdate() {
        const objDiv = document.querySelector( '.messages-main' )
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render(){

        const {
            currentchat,
            activeRoomIndex,
            user
        } = this.props;

        const messageBox = currentchat.map( ( message, index, arr ) => {
            let avatarUsr = ''
            if (message.user_id===1){
                avatarUsr=userImg1
            }
            else if(message.user_id===2){
                avatarUsr=userImg2
            }
            else avatarUsr = userImg3

            if( message.type === 'user' ){
                return(
                    <div className="message-outside" key={ index }>
                        <Row top="xs" className="message-container">
                            <Col xs={ 1 }>
                                {
                                    index > 0
                                    &&
                                    arr[ index-1 ].type
                                    &&
                                    arr[ index-1 ].type !== message.type
                                    &&
                                    <img src={ avatarUsr } alt="User Avatar"/>
                                }
                                {
                                    index === 0
                                    &&
                                    <img src={ avatarUsr } alt="User Avatar"/>
                                }
                            </Col>
                            <Col xs={ 11 } className="message-name">
                                {
                                    index > 0
                                    &&
                                    arr[ index-1 ].type
                                    &&
                                    arr[ index-1 ].type !== message.type
                                    &&
                                    message.firstname
                                    + ' ' +
                                    message.lastname
                                }
                                {
                                    index === 0
                                    &&
                                    message.firstname
                                    + ' ' +
                                    message.lastname
                                }
                                <span className="message-time">
                                    { moment (
                                        message.timestamp
                                    )
                                    .format (
                                        "h:mm A - MMM DD YYYY"
                                    ) }
                                </span>
                                <Row className="message-text">
                                    { message.message }
                                </Row>
                            </Col>
                        </Row>
                    </div>
                )
            }
            return (
                <div className="message-outside" key={ index }>
                    <Row top="xs" className="message-container">
                        <Col xs={ 1 } className="message-image">
                            {
                                index > 0
                                &&
                                arr[ index-1 ].type
                                &&
                                arr[ index-1 ].type !== message.type
                                &&
                                <img src={ adminImg } alt="Admin Avatar"/>
                            }
                            {
                                index === 0
                                &&
                                <img src={ adminImg } alt="Admin Avatar"/>
                            }
                        </Col>
                        <Col xs={ 11 } className="message-name">
                            {
                                index > 0
                                &&
                                arr[ index-1 ].type
                                &&
                                arr[ index-1 ].type !== message.type
                                &&
                                user.firstname
                                + ' ' +
                                user.lastname
                            }
                            {
                                index === 0
                                &&
                                user.firstname
                                + ' ' +
                                user.lastname
                            }
                            <span className="message-time">
                                { moment (
                                    message.timestamp
                                )
                                .format (
                                    "h:mm A - MMM DD YYYY"
                                ) }
                            </span>
                            <Row className="message-text">
                                { message.message }
                            </Row>
                        </Col>
                    </Row>
                </div>
            )
        })

        return (
            <div className="messages-main">
                <h2>Inbox</h2>
                    { messageBox }
                <Row className="message-input-container">
                    <Col xs={ 12 }>
                        <form onSubmit={ this.handleSubmit } className="message-input">
                            <Field
                                label="Type a Message"
                                name="message"
                                component={ renderTextField }
                                onChange={ this.handleChange
                                    .bind( this, 'message' ) }
                            />
                            <div className="message-btn-container">
                                <FlatButton
                                    type="submit"
                                    label="Send"
                                    disabled={ !activeRoomIndex }
                                    primary={ true }
                                />
                            </div>
                        </form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const form = reduxForm( {
    form: 'messageForm'
} )

const mapStateToProps = state => {
    return {
        currentchat:state.messageDuck.currentchat,
        messages:state.messageDuck.messages,
        activeRoomIndex: state.messageDuck.activeRoomIndex,
        user: state.authDuck.user
    }
}

export default withRouter( connect( mapStateToProps, { sendMessage } )( form( Messages ) ) )
