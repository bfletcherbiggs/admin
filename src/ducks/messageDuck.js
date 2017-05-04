//LIBRARIES
import _ from 'lodash';
//EXPORTED FUNCTIONS
import { postMessage,chatRead } from './socketDuck';
import { reset } from 'redux-form';

const GET_MESSAGES = "GET_MESSAGES",
      SELECT_CHAT = 'SELECT_CHAT',
      SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
      SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDING',
      FILTER_ROOMS = 'FILTER_ROOMS';

const initialState = {
    messages:[{}],
    activeRoomIndex: null,
    room_titles:[],
    filter_room_titles:[],
    users:[],
    loadingmessages:true,
    currentchat:[],
    submittingmessage:false,
    count_messages:[0],
    userid:null,
    client:[]
}

export default function messageDuck( state = initialState, action ) {
    switch ( action.type ) {
        case GET_MESSAGES:
            if ( !action.messages ){
                return Object.assign( {}, state, {
                    messages: action.messages,
                    loadingmessage:false,
                    room_titles:[],
                    filter_room_titles:[],
                    count_messages:[],
                    client:[]
                } )
            }
            else{
                let room_titles = []
                _.each( action.messages, message => {
                    room_titles.push( _.uniqBy( message, 'user_id' ) )
                } )
                let count_messages = []
                _.each( action.messages, messagegroup => {
                    count_messages.push( _.sumBy( messagegroup, message =>
                        message.read===false && message.type==='user'
                        ?1:0
                    ) )
                } )
                count_messages.unshift( _.sum( count_messages ) )
                let currentchat = Object.assign( [], state.currentchat )
                if( state.activeRoomIndex ){
                    currentchat = action.messages[ state.activeRoomIndex ]
                }
                else{
                    currentchat=[]
                }
                console.log(currentchat)
                return Object.assign( {}, state, {
                    messages: action.messages,
                    loadingmessage:false,
                    room_titles:room_titles,
                    filter_room_titles:room_titles,
                    count_messages:count_messages,
                    currentchat:currentchat
                } )
            }
        case FILTER_ROOMS:
            let filteredRooms = Object.assign( {}, state.room_titles )
            filteredRooms = action.filter
            return Object.assign( {}, state, {
                filter_room_titles:filteredRooms
            } )
        case SELECT_CHAT:
            let client = Object.assign( {}, state.client )
            client = _.uniqBy( action.payload, 'user_id' )
            return Object.assign( {}, state, {
                currentchat:action.payload,
                activeRoomIndex: action.index,
                userid:action.userid,
                client: client
            } )
        case SEND_MESSAGE_PENDING:
            return Object.assign( {}, state, {
                submittingmessage:true
            } )
        case SEND_MESSAGE_SUCCESS:
            let newMessages = Object.assign( {}, state.messages )
            newMessages[ state.activeRoomIndex ] = newMessages[ state.activeRoomIndex ].concat( action.payload[ 0 ] )
            return Object.assign( {}, state, {
                submittingmessage:false,
                currentchat:state.currentchat.concat( action.payload ),
                messages:newMessages
            } )
        default:
            return state;
    }
}

export function getMessages( messages ) {
    return dispatch => {
        dispatch( { type: GET_MESSAGES,messages } )
    }
}

export function sendMessage( adminid, userid, message, index ){
    let messagebody = { adminid, userid, message, index }
    postMessage( messagebody )
    return dispatch => {
        dispatch( { type: SEND_MESSAGE_PENDING } )
        dispatch( reset( 'messageForm' ) )
    }
}

export function updateMessages( data ) {
    return dispatch => {
        dispatch( { type:SEND_MESSAGE_SUCCESS, payload:data } )
    }
}

export function filterUsers ( searchArr ) {
    return dispatch => {
        dispatch( { type:FILTER_ROOMS, filter:searchArr } )
    }
}

export function getChat( allmessages, key, adminid ) {
    let data = allmessages[ key ]
    let chatUpdateObj = { key, adminid }
    return dispatch => {
        chatRead( chatUpdateObj )
        dispatch( { type:SELECT_CHAT, payload:data, index: key, userid:data[ 0 ].user_id } )
    }
}
