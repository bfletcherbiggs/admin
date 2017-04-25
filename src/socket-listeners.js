import { getMessages, updateMessages } from './ducks/messageDuck';
import { socketConnected } from './ducks/authDuck'

import io from 'socket.io-client';
export const socket = io( 'http://localhost:3001' );

export default function ( dispatch, getState ) {
    socket.on( 'socketid', data =>{
        dispatch ( socketConnected( data ))
    })
    socket.on( 'messagesfetched', data => {
        dispatch( getMessages( data ) )
    })
    socket.on( 'messagereceived', data => {
        dispatch( updateMessages( data ) )
    })
}
