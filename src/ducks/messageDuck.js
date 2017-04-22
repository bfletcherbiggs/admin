import axiosLibrary from 'axios';
import io from 'socket.io-client';
const axios = axiosLibrary.create({ withCredentials: true });
// import store from '../store';
const socket = io('http://localhost:3001');

const FETCH_MESSAGES = 'FETCH_MESSAGES'

const initialState = {
    userID: '',
    adminID: '',
    messages:[],
    room_title:'',
    users:[]
}

export default function messageDuck( state = initialState, action ) {
    switch ( action.type ) {
        case FETCH_MESSAGES:
            return Object.assign({}, state,{
                messages:action.messages
            })
        default:
            return state;
    }
}

export function initiateRoomState() {
    return (dispatch,getState)=>{
        const messages = getState().loginDuck.messages
        console.log(messages)
        dispatch( {
            type: FETCH_MESSAGES,
            messages
        })
        socket.emit('')
    }
}
