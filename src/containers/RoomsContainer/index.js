import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBarTop from '../../components/Nav/index'
import { withRouter } from 'react-router-dom';
import { initiateRoomState } from '../../ducks/messageDuck'

import "./RoomsContainer.css"

class RoomsContainer extends Component {
    constructor() {
        super()

        this.state = {

        }

    //  this.handleOnChange = this.handleOnChange.bind(this)
    //  this.handleOnSubmit = this.handleOnSubmit.bind(this)
    //  this._handleMessageEvent = this._handleMessageEvent.bind(this)
    //  this._handleFileUpload = this._handleFileUpload.bind(this)
   }

  componentWillMount() {
      this._init()
  }

  componentDidMount(){
    // console.log(this.props)
    // this._handleFileUpload()
    // this._handleMessageEvent()
  }

  componentWillReceiveProps(nextProps){
    console.log('room props', nextProps)
  }

  handleOnChange(ev) {
    this.setState({ input: ev.target.value})
  }

  // handleOnSubmit(ev) {
  //
  //   ev.preventDefault()
  //   socket.emit('chat message', {message: this.state.input, room: this.props.room.title, user: this.props.user})
  //   this.setState({ input: '' })
  // }
  //
  // _handleMessageEvent(){
  //   socket.on('chat message', (inboundMessage) => {
  //      this.props.createMessage({room: this.props.room, newMessage: {user: JSON.parse(inboundMessage).user, message: JSON.parse(inboundMessage).message}})
  //    })
  // }

  _init(){
        // console.log(this.props)
      this.props.initiateRoomState()
      console.log(this.props)
    //   socket.emit('ENTERROOMNAMEHERE', {room: this.props.room.title})
    //     this.setState({connected: true})
    // }
  }

  renderRoomTiles
  render() {

    return (
      <div>
        <NavBarTop/>
        <aside>

        </aside>
        <h3>HELLO ROOM CONTAINER</h3>
      </div>


    )
  }

}

function mapStateToProps(state) {
    console.log('room', state)
    return {
        messages:state.messageDuck.messages,
        user: state.loginDuck.user,
        socket: state.loginDuck.socket
    }
}

export default withRouter(connect( mapStateToProps, {initiateRoomState})( RoomsContainer ))
