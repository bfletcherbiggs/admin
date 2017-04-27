import { socket } from '../socket-listeners';

export function authenticate( userId ) {
    socket.emit( 'authenticated', userId )
}

export function postMessage( message ) {
    socket.emit( 'newmessage', message )
}

export function chatRead( chatInfo ) {
    socket.emit( 'chatread', chatInfo )
}
export function fetchMessages( adminId ){
    socket.emit( 'fetchmessages', adminId )
}
