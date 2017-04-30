//LIBRARIES
import _ from 'lodash';
//EXPORTED FUNCTIONS
import { postMessage,chatRead } from './socketDuck';

const GET_MESSAGES = "GET_MESSAGES",
    SELECT_CHAT = 'SELECT_CHAT',
    SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_PENDING = 'SEND_MESSAGE_PENDING';

const initialState = {
    messages:[{}],
    activeRoomIndex: null,
    room_titles:[],
    users:[],
    loadingmessages:true,
    currentchat:[],
    submittingmessage:false,
    count_messages:[0]
}

export default function messageDuck( state = initialState, action ) {
    switch ( action.type ) {
        case GET_MESSAGES:
            if ( !action.messages ){
                return Object.assign( {}, state, {
                    messages: action.messages,
                    loadingmessage:false,
                    room_titles:[],
                    count_messages:[]
                })
            }
            else{
                let room_titles = []
                _.each( action.messages, message => {
                    room_titles.push( _.uniqBy( message, 'user_id' ) )
                })
                let count_messages = []
                _.each( action.messages, messagegroup => {
                    count_messages.push( _.sumBy( messagegroup, message =>
                        message.read===false && message.type==='user'
                        ?1:0
                    ))
                })
                count_messages.unshift( _.sum( count_messages ) )
                let currentchat = Object.assign( [], state.currentchat )
                if(state.activeRoomIndex){
                    currentchat = action.messages[ state.activeRoomIndex ]
                }
                else{
                    currentchat=[]
                }
                return Object.assign( {}, state, {
                    messages: action.messages,
                    loadingmessage:false,
                    room_titles:room_titles,
                    count_messages:count_messages,
                    currentchat:currentchat
                })
            }
        case SELECT_CHAT:
            return Object.assign( {}, state,{
                currentchat:action.payload,
                activeRoomIndex: action.index
            })
        case SEND_MESSAGE_PENDING:
            return Object.assign( {}, state,{
                submittingmessage:true
            })
        case SEND_MESSAGE_SUCCESS:
            let newMessages = Object.assign( {}, state.messages )
            newMessages[ state.activeRoomIndex ] = newMessages[ state.activeRoomIndex ].concat( action.payload[ 0 ] )
            return Object.assign( {}, state,{
                submittingmessage:false,
                currentchat:state.currentchat.concat( action.payload ),
                messages:newMessages
            })
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
    return { type: SEND_MESSAGE_PENDING }
}

export function updateMessages( data ) {
    return { type:SEND_MESSAGE_SUCCESS, payload:data }
}

export function getChat( allmessages, key, adminid ) {
    let data = allmessages[ key ]
    let chatUpdateObj = { key, adminid }
    return dispatch => {
        chatRead( chatUpdateObj )
        dispatch( { type:SELECT_CHAT, payload:data, index: key } )
    }
}
