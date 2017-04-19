import axiosLibrary from 'axios'
const axios = axiosLibrary.create({
	withCredentials: true
})
import socket from 'socket.io-client'

const AUTH_REQUEST = "AUTH_REQUEST",
			AUTH_SUCCESS = "AUTH_SUCCESS",
			AUTH_FAILURE = "AUTH_FAILURE",
			LOGOUT = "LOGOUT",
			SOCKET_CONNECTED = "SOCKET_CONNECTED",
			SIGNUP_FAILURE = "SIGNUP_FAILURE",
			BASE_URL = "http://localhost:3001";

const initialState = {
		user:[],
		isAuthenticated:false,
		errorAuthenticating:false,
		loadingUser:false,
		signupErrors:[],
		loginError: null,
		socket:null
};

export default function userDuck( state = initialState, action ) {
		switch ( action.type ) {
				case AUTH_REQUEST:
						return Object.assign({},state, {
								loadingUser:true,
								isAuthenticated:false,
								errorAuthenticating:false
						})
				case AUTH_SUCCESS:
						return Object.assign({},state, {
								user:action.payload,
								loadingUser:false,
								errorAuthenticating:false,
								isAuthenticated:true
						})
				case AUTH_FAILURE:
						return Object.assign({},state,{
								errorAuthenticating:true,
								loadingUser:false,
								loginError: action.error
						})
				case LOGOUT:
						return Object.assign({}, state, {
								 isAuthenticated:false,
								 socket:null,
								 user:{},
								 loadingUser:false
						})
				case SIGNUP_FAILURE:
						return Object.assign({},state,{
								errorAuthenticating:true,
								signupErrors: action.error
						})
				default: return state;
		}
}

// function connectToSocket(dispatch) {
//   const token = JSON.parse(localStorage.getItem('token'));
//   const socket = new Socket(`${WEBSOCKET_URL}/socket`, {
//     params: { token },
//   });
//   socket.connect();
//   dispatch({ type: 'SOCKET_CONNECTED', socket });
// }

function setCurrentUser(dispatch, response) {
	localStorage.setItem('token', JSON.stringify(response));
	dispatch(authSuccess(response));
	// connectToSocket(dispatch); // new line
}

function authSuccess(response) {
	return {
		type: AUTH_SUCCESS,
		payload: response
	}
}

function authRequest() {
	return {
		type: AUTH_REQUEST
	}
}

function authFailure(err) {
	return { type: AUTH_FAILURE, error: err }
}

export function login(data) {
		console.log(data)
	  return (dispatch) => {
				dispatch(authRequest())
				axios.post(BASE_URL+'/login', data)
		    .then((response) => {
						console.log(response)
			      setCurrentUser(dispatch, response);
			      // dispatch(reset('login'));
		    })
		    .catch(err => {
						console.dir(err)
		      	dispatch(authFailure(err.response.data));
		    });
		}
}

function signupFailure(err){
		return { type: SIGNUP_FAILURE, error:err}
}

export function signup(data) {
  	return (dispatch) => axios.post(BASE_URL+'/user/create', data)
		    .then((response) => {
  			    setCurrentUser(dispatch, response);
      			// dispatch(reset('signup'));
    		})
    		.catch(err => {
					console.log(err)
      			dispatch(signupFailure(err));
    		});
}

function logOut(){
		return {type:LOGOUT}
}

export function logout(router) {
	  return (dispatch) => axios.get(BASE_URL+'/logout')
		    .then(() => {
			      localStorage.removeItem('token');
			      dispatch(logOut());
	    	});
}
