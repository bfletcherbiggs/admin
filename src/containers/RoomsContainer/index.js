import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//COMPONENTS
import NavBarTop from '../../components/Nav/index'
//LIBRARIES
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import moment from 'moment';
import Subheader from 'material-ui/Subheader';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
//EXPORTED FUNCTIONS
import { getChat,sendMessage } from '../../ducks/messageDuck'
//CSS
import "./RoomsContainer.css"

class RoomsContainer extends Component {
    constructor() {
        super()

        this.state = {
            message:''
        }

        this._selectActiveRoom = this._selectActiveRoom.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
   }

    handleOnChange( e ) {
        this.setState( { input: e.target.value} )
    }

    _selectActiveRoom( key ){
        this.props.getChat(
            this.props.messages,
            key,
            this.props.user.id
        )
    }

    handleSubmit( e ) {
        e.preventDefault();
        this.props.sendMessage(
            this.props.currentchat[0].user_id,
            this.props.currentchat[0].admin_id,
            this.state.message,
            this.props.activeRoomIndex
        )
    }
    handleChange( field, e ) {
        this.setState( { [ field ]: e.target.value } )
    }

    render() {
        const {
            room_titles,
            currentchat,
            activeRoomIndex
          } = this.props;

        const roomTime = room_titles.map( room => {
            return (
                <ListItem
                    primaryText={ room[0].firstname + " " + room[0].lastname }
                    rightIcon={ <CommunicationChatBubble /> }
                    key={ room[0].chat_id }
                    onClick={ ()=>this._selectActiveRoom( room[0].chat_id ) }
                />
            )
        })
        const messageBox = currentchat.map( ( message, index ) => {
            if( message.type==='user' ){
                return(
                    <div className="message-container user" key={index}>
                        <h1>{message.message}</h1>
                        <h2>{moment(message.timestamp).format("MMM Do YY")}</h2>
                    </div>
                )
            }
            return(
                <div className="message-container" key={index}>
                  <h1>{message.message}</h1>
                  <h2>{moment(message.timestamp).format("MMM Do YY")}</h2>
                </div>
            )
        })

      return (
          <div>
              <NavBarTop/>
              <div className="room-container">
                  <aside className="room-list-container">
                      <Subheader>Current chats</Subheader>
                          { roomTime }
                      <Divider />
                  </aside>
                  <div className="chat-container">
                      { messageBox }
                      <form onSubmit={ this.handleSubmit } className="message-input">
                          <TextField
                              hintText="Type a Message"
                              onChange={ this.handleChange.bind( this, 'message' ) }
                          />
                          <FlatButton
                              type="submit"
                              label="Send"
                              disabled={ !activeRoomIndex }
                              primary={ true }
                          />
                      </form>
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps( state ) {
    return {
        currentchat:state.messageDuck.currentchat,
        room_titles:state.messageDuck.room_titles,
        messages:state.messageDuck.messages,
        user: state.authDuck.user,
        socket: state.authDuck.socket,
        loadingmessages: state.messageDuck.loadingmessages,
        activeRoomIndex: state.messageDuck.activeRoomIndex
    }
}

export default withRouter( connect( mapStateToProps, { getChat,sendMessage } )( RoomsContainer ) )
