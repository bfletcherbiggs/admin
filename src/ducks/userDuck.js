import axiosLibrary from 'axios';
const axios = axiosLibrary.create({ withCredentials: true });
import io from "socket.io-client";
const socket = io('http://localhost:3001')


    const AUTH_REQUEST = "AUTH_REQUEST",
        AUTH_SUCCESS = "AUTH_SUCCESS",
        AUTH_FAILURE = "AUTH_FAILURE",
        GET_MESSAGES = "GET_MESSAGES",
        LOGOUT = "LOGOUT",
        SOCKET_CONNECTED = "SOCKET_CONNECTED",
        SIGNUP_FAILURE = "SIGNUP_FAILURE",
        BASE_URL = "http://localhost:3001",
        BASE_API_URL = BASE_URL + "/api";

    const initialState = {
        user: {},
        isAuthenticated: false,
        errorAuthenticating: false,
        loadingUser: false,
        signupErrors: [],
        messageError: null,
        loginError: null,
        socket: null,
        messages:[]
    };

    export default function userDuck( state = initialState, action ) {
        switch ( action.type ) {
            case AUTH_REQUEST:
                return Object.assign({}, state, {
                    loadingUser: true,
                    isAuthenticated: false,
                    errorAuthenticating: false
                })
            case AUTH_SUCCESS:
                return Object.assign({}, state, {
                    user: action.payload,
                    loadingUser: false,
                    errorAuthenticating: false,
                    isAuthenticated: true
                })
            case AUTH_FAILURE:
                return Object.assign({}, state, {
                    errorAuthenticating: true,
                    loadingUser: false,
                    loginError: action.error
                })
            case GET_MESSAGES:
                return Object.assign({}, state, {
                    messages: action.messages
                })
            case LOGOUT:
                return Object.assign({}, state, {
                    isAuthenticated: false,
                    socket: null,
                    user: {},
                    loadingUser: false
                })
            case SOCKET_CONNECTED:
                return Object.assign({}, state, { socket: action.payload })
            case SIGNUP_FAILURE:
                return Object.assign({}, state, {
                    errorAuthenticating: true,
                    signupErrors: action.error
                })
            default:
                return state;
        }
    }

    function connectToSocket( dispatch ) {
        const token = JSON.parse(localStorage.getItem( 'token' ));
        socket.on('retrieveAllMessages', data=>{
            dispatch(getMessages(data));
        })
        socket.emit('fetchAllMessages')
        dispatch(socketConnected( token ));
    }

    function socketConnected( response ) {
        return { type: SOCKET_CONNECTED, payload: response }
    }

    function setCurrentUser( dispatch, response ) {
        localStorage.setItem('token', JSON.stringify( response ));
        dispatch(authSuccess( response ));
        connectToSocket( dispatch );
    }

    function authSuccess( response ) {
        return { type: AUTH_SUCCESS, payload: response }
    }

    function authRequest( ) {
        return { type: AUTH_REQUEST }
    }

    function authFailure( err ) {
        return { type: AUTH_FAILURE, error: err }
    }

    function getMessages(messages) {
        return {
            type: GET_MESSAGES,
            messages
        }
    }
    export function login( data ) {
        return ( dispatch ) => {
            dispatch(authRequest( ))
            axios.post( BASE_API_URL + '/login', data ).then(( response ) => {
                socket.on('messagesfetched', data => {
                    dispatch(getMessages(data))
                })
                socket.emit('authenticated', response.data.id)
                setCurrentUser( dispatch, response );
            }).catch(err => {
                dispatch(authFailure( err ));
            });
        }
    }

    function signupFailure( err ) {
        return { type: SIGNUP_FAILURE, error: err }
    }

    export function signup( data ) {
        return ( dispatch ) => axios.post( BASE_API_URL + '/user', data ).then(( response ) => {
            setCurrentUser( dispatch, response );
        }).catch(err => {
            dispatch(signupFailure( err ));
        });
    }

    function logadminout(  ) {
        return {type: LOGOUT}
    }

    export function logout() {
        return ( dispatch ) =>
        axios.get( BASE_API_URL + '/logout' ).then(( response ) => {
            localStorage.removeItem( 'token' );
            dispatch(logadminout())
        });
    }
