import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//EXPORTED FUNCTIONS
import { getChat } from '../../ducks/messageDuck';
import { getComps } from '../../ducks/compDuck';
//COMPONENTS
import Search from '../../components/Search/index';
//MATERIAL UI
import { ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
//CSS
import './users.css';

class Users extends Component{
    constructor() {
        super()

        this._selectActiveRoom = this._selectActiveRoom.bind( this )
    }

    _selectActiveRoom( key ){
        this.props.getChat(
            this.props.messages,
            key,
            this.props.user.id
        )
        let userId = {userId: this.props.messages[key][0].user_id}
        this.props.getComps(userId)
    }

    render(){

        const {
            filter_room_titles,
            count_messages
        } = this.props;

        const roomTime = filter_room_titles.map( ( room, idx ) => {
            let messageCount = count_messages[ idx + 1 ]
            let text = room[ 0 ].firstname + " " + room[ 0 ].lastname + " - " + room[ 0 ].company;
            return (
                <ListItem
                    primaryText={ text }
                    key={ room[ 0 ].chat_id }
                    onClick={ () => this._selectActiveRoom( room[ 0 ].chat_id ) }
                >
                {
                    messageCount
                    ?
                    <span>{ messageCount }</span>
                    :
                    null
                }
                </ListItem>
            )
        })

        return (
            <div className="users-container">
                <Search/>

                <div className="users-main">
                    <Divider />
                    <Subheader>Current Users</Subheader>
                    { roomTime }
                    <Divider />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        filter_room_titles:state.messageDuck.filter_room_titles,
        messages:state.messageDuck.messages,
        user: state.authDuck.user,
        count_messages: state.messageDuck.count_messages
    }
}

export default withRouter( connect( mapStateToProps, { getChat, getComps } )( Users ) )
