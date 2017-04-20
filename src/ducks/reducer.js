import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

// import intake from "./ducks/intakeDuck";
import loginDuck from "./userDuck";
import messageDuck from "./messageDuck"

export default combineReducers( {
	messageDuck,
	loginDuck,
	form:formReducer
} );
