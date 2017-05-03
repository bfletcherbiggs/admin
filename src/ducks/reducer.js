import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer } from 'react-redux-sweetalert';
import authDuck from './authDuck';
import messageDuck from './messageDuck';
import compDuck from './compDuck';

export default combineReducers( {
	messageDuck,
	authDuck,
	compDuck,
	form:formReducer,
	sweetalert: reducer
} );
