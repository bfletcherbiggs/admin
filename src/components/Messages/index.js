//PACKAGES
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
//LIBRARIES
import moment from 'moment';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
//EXPORTED FUNCTIONS
import { sendMessage } from '../../ducks/messageDuck'
//CSS
import "./messages.css";

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
      e.preventDefault();
   }

   handleChange( field, e ) {
      this.setState( { [ field ]: e.target.value } )
   }

    render(){

      const {
         currentchat,
         activeRoomIndex
      } = this.props;

      const messageBox = currentchat.map( ( message, index ) => {
         if( message.type==='user' ){
            return(
               <div className="message-container user" key={ index }>
                  <h1>{ message.message }</h1>
                  <h2>{ moment( message.timestamp ).format( "MMM Do YY" ) }</h2>
               </div>
            )
         }
         return(
            <div className="message-container" key={ index }>
               <h1>{ message.message }</h1>
               <h2>{ moment( message.timestamp ).format( "MMM Do YY" ) }</h2>
            </div>
         )
      })

     return (
         <div className="messages-main">
            { messageBox }
            <form onSubmit={ this.handleSubmit } className="message-input">
               <Field
                  label="Type a Message"
                  name="message"
                  component={ renderTextField }
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
      )
   }
}

const form = reduxForm({
   form: 'messageForm'
})

const mapStateToProps = state => {
   return {
      currentchat:state.messageDuck.currentchat,
      messages:state.messageDuck.messages,
      activeRoomIndex: state.messageDuck.activeRoomIndex
   }
}

export default withRouter( connect( mapStateToProps, { sendMessage } )( form( Messages ) ) )
