import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import reducer from "./ducks/reducer";
import addSocketListeners from './socket-listeners';

const store = createStore( reducer,undefined,applyMiddleware( thunkMiddleware ) );

addSocketListeners( store.dispatch, store.getState )

export default store;
