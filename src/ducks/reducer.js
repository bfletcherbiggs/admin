import { combineReducers } from "redux";

import intake from "./ducks/intakeDuck";
import user from "./ducks/userDuck";

export default combineReducers( {
	  intake
	, user
} );
