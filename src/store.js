import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import reducer from "./ducks/reducer";

export default
createStore(reducer,undefined,applyMiddleware(promiseMiddleware()));
