const LOGIN="user/LOGIN",
			LOGOUT = "user/LOGOUT";

const initialState = {
		user:[],
		isAuthenticated:false,
		errorAuthenticating:false,
		loadingUser:false
};

export default function userDuck( state = initialState, action ) {
		switch ( action.type ) {
				case LOGIN + "_FULFILLED":
						return Object.assign({},state, {
							user:action.payload,
							loadingUser:false,
							isAuthenticated:false,
							errorAuthenticating:false
						})
				case LOGIN + "_FULFILLED":
						return Object.assign({},state, {
							user:state.user,
							loadingUser:true
						})
				case LOGIN + "_REJECTED":
						return Object.assign({},state,{
							errorAuthenticating:true
						})
				case LOGOUT + "_FULFILLED":
						return state;
				case LOGOUT + "_FULFILLED":
						return Object.assign({},state, {
							user:state.user,
							loadingUser:true
						})
				case LOGOUT + "_REJECTED":
						return Object.assign({},state,{
							errorAuthenticating:true
						})
				default: return state;
		}
}

export function setUser( loginPromise ) {
	return { type: LOGIN, payload:loginPromise };
}

export function delUser( logoutPromise ) {
	return { type: LOGOUT,payload:logoutPromise };
}

import axios from 'axios';
import store from "../store";
import {setUser,delUser} from "../ducks/userDuck"

const BASE_URL = "http://localhost:3001"
// import * as sessionApi from '../api/sessionApi';

export function getUser (user){
    const loginPromise = axios.post(BASE_URL+"/login",user)
        .then(user => user.response.data)

    store.dispatch(setUser(loginPromise))
}

export function logout (){
    const logoutPromise = axios.post(BASE_URL+"/logout",user)
        .then(user => user.response.data)

    store.dispatch(delUser(logoutPromise))
}
