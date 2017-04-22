import axiosLibrary from 'axios';
const axios = axiosLibrary.create({ withCredentials: true });
import io from "socket.io-client";
const socket = io('http://localhost:3001')

//Action Definitions
    const AUTH_REQUEST = "AUTH_REQUEST",
        AUTH_SUCCESS = "AUTH_SUCCESS",
        AUTH_FAILURE = "AUTH_FAILURE",
        CHECK_AUTH_SUCCESS = "CHECK_AUTH_SUCCESS",
        CHECK_AUTH_FAILURE = "CHECK_AUTH_FAILURE",
        FETCH_USER_INFO = "FETCH_USER_INFO",
        GET_MESSAGES = "GET_MESSAGES",
        LOGOUT = "LOGOUT",
        SIGNUP_FAILURE = "SIGNUP_FAILURE",
        SOCKET_CONNECTED = "SOCKET_CONNECTED",
        BASE_URL = "http://localhost:3001",
        BASE_API_URL = BASE_URL + "/api";

//Initial State
    const initialState = {
        user: {},
        isAuthenticated: null,
        errorAuthenticating: false,
        loadingUser: false,
        signupErrors: [],
        messageError: null,
        loginError: null,
        socket: null,
        messages:[]
    };

//User Duck
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
                    loginError: action.error,
                    isAuthenticated:false
                })
            case CHECK_AUTH_SUCCESS:
                return Object.assign({}, state, {
                    isAuthenticated:true
                })
            case CHECK_AUTH_FAILURE:
                return Object.assign({}, state, {
                    isAuthenticated:false
                })
            case GET_MESSAGES:
                return Object.assign({}, state, {
                    messages: action.messages
                })
            case FETCH_USER_INFO:
                return Object.assign({}, state,{
                    user:state.user,
                    socket: state.socket,
                    messages:state.messages
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

//Dispatch Functions
    function authSuccess( response ) {
        localStorage.setItem( 'userAuthenticated',JSON.stringify('true') );
        return { type: AUTH_SUCCESS, payload: response.data }
    }

    function authRequest( ) {
        return { type: AUTH_REQUEST }
    }

    function authFailure( err ) {
        return { type: AUTH_FAILURE, error: err }
    }

    function checkAuthSuccess(){
        return { type:CHECK_AUTH_SUCCESS }
    }

    function checkAuthFailure(){
        return { type:CHECK_AUTH_FAILURE }
    }

    function connectToSocket( dispatch ) {
        const token = JSON.parse(localStorage.getItem( 'token' ));
        socket.on('retrieveAllMessages', data=>{
            dispatch( getMessages( data ) );
        })
        socket.emit( 'fetchAllMessages' )
    }

    function getMessages( messages ) {
        return {
            type: GET_MESSAGES,
            messages
        }
    }

    function logAdminOut() {
        return { type:LOGOUT }
    }

    function setCurrentUser( dispatch, response ) {
        localStorage.setItem('token', JSON.stringify( response ));
        dispatch(authSuccess( response ));
    }

    function signupFailure( err ) {
        return { type: SIGNUP_FAILURE, error: err }
    }

    function socketConnected( data ) {
        return { type: SOCKET_CONNECTED, payload: data }
    }

//Export Functions
    export function checkUserAuth() {
        return ( dispatch ) =>{
            if( localStorage.getItem( 'token' ) ){
                dispatch( checkAuthSuccess() )
            }
            else { dispatch( checkAuthFailure() ) }
        }
    }

    export function login( data ) {
        return ( dispatch ) => {
            dispatch( authRequest() )
            axios.post( BASE_API_URL + '/login', data )
            .then(( response ) => {
                    socket.on( 'messagesfetched', data => {
                        dispatch( getMessages(data) )
                    })
                    socket.on('socketid',(data)=>{
                        dispatch ( socketConnected( data ))
                    })
                    socket.emit( 'authenticated', response.data.id )
                    setCurrentUser( dispatch, response );
            })
            .catch(err => {
                dispatch( authFailure( err ) );
            });
        }
    }

    export function logout() {
        return ( dispatch ) =>
        axios.get( BASE_API_URL + '/logout' )
        .then(( response ) => {
            localStorage.removeItem( 'token' );
            dispatch( logAdminOut() )
        });
    }

    export function signup( data ) {
        return ( dispatch ) => axios.post( BASE_API_URL + '/user', data )
        .then(( response ) => {
            setCurrentUser( dispatch, response );
        })
        .catch( err => {
            dispatch(signupFailure( err ));
        });
    }
