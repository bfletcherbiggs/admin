import React, { PropTypes } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../../ducks/messageDuck'
import "./MessagePage.css"

class ChatContainer extends Component {
  constructor(props) {
    super(props)

     this.state = {
       input : '',
       imagePreviewUrl: '',
       messages: props.messages,
       connected: false
     }

     this.handleOnChange = this.handleOnChange.bind(this)
     this.handleOnSubmit = this.handleOnSubmit.bind(this)
     this._handleMessageEvent = this._handleMessageEvent.bind(this)
     this._handleFileUpload = this._handleFileUpload.bind(this)
   }


  componentWillMount() {
    this._init()
  }

  componentDidMount(){
    console.log('did mount')
    this._handleFileUpload()
    this._handleMessageEvent()
  }

  handleOnChange(ev) {
    this.setState({ input: ev.target.value})
  }

  handleOnSubmit(ev) {

    ev.preventDefault()
    socket.emit('chat message', {message: this.state.input, room: this.props.room.title, user: this.props.user})
    this.setState({ input: '' })
  }

  _handleMessageEvent(){
    socket.on('chat message', (inboundMessage) => {
       this.props.createMessage({room: this.props.room, newMessage: {user: JSON.parse(inboundMessage).user, message: JSON.parse(inboundMessage).message}})
       console.log('received message', inboundMessage)
     })
  }

  _init(){
    if(!(this.state.connected)){
      this.props.fetchRoom()
      socket.emit('ENTERROOMNAMEHERE', {room: this.props.room.title})
        this.setState({connected: true})
    }
  }

  render() {

    return (
      <div>

        <ChatLog messages={this.props.messages} image={''}/>

                <form>
        <TextField
         hintText="Message Field"
         floatingLabelText="MultiLine and FloatingLabel"
         multiLine={true}
         rows={2}
             />
            <FlatButton onClick={this.handleOnSubmit} label="Submit" primary={true} />
             </form>


           </div>
    )
  }

}

function mapStateToProps(state, ownProps) {
  return { messages: state.activeRoom.messages, room: state.activeRoom, user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createMessage: messageActions.saveMessage, fetchRoom: roomActions.fetchRoomData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer)
