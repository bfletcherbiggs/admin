import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import authDuck from "./authDuck";
import messageDuck from "./messageDuck"

export default combineReducers( {
	messageDuck,
	authDuck,
	form:formReducer
} );
