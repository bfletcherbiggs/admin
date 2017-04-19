import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'

// import intake from "./ducks/intakeDuck";
import loginDuck from "./userDuck";

export default combineReducers( {
	  // intake
	loginDuck,
	form:formReducer
} );
