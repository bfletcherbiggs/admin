import axiosLibrary from 'axios';
import { APISERVERPATH } from '../config.json';
const axios = axiosLibrary.create({withCredentials: true});


  const COMP_REQUEST = "COMP_REQUEST",
    COMP_SUCCESS = "COMP_SUCCESS",
    COMP_FAILURE = "COMP_FAILURE",
    COMP_COMPLETED = "COMP_COMPLETED",
    BASE_URL = APISERVERPATH;

  const initialState = {
    varComponentTypes: [],
    loadingComps: false,
    compsLoaded: false,
    errorLoadingComps: false,
  };

  export default function compDuck(state = initialState, action) {
    switch (action.type) {
      case COMP_REQUEST:
        return Object.assign({}, state, {
          loadingComps: true,
          compsLoaded: false,
          errorLoadingComps: false
        })
      case COMP_SUCCESS:
        return Object.assign({}, state, {
          varComponentTypes: action.payload,
          loadingComps: false,
          errorLoadingComps: false,
          compsLoaded: true
        })
      case COMP_FAILURE:
        return Object.assign({}, state, {
          errorLoadingComps: true,
          loadingComps: false,
          compError: action.error
        })
      case COMP_COMPLETED:
        var completedArr = {}
        Object.assign( completedArr, state.varComponentTypes )
        completedArr.data.map( comp => {
          if (comp.compName === action.payload.component) {
            return comp.completed = action.payload.completed
          }
          return comp
        })
        return Object.assign({}, state, {
          varComponentTypes: completedArr
        })
      default:
        return state;
    }
  }

  function compSuccess(response) {
    return {type: COMP_SUCCESS, payload: response}
  }

  function compRequest() {
    return {type: COMP_REQUEST}
  }

  function compFailure(err) {
    return {type: COMP_FAILURE, error: err}
  }
  function compComplete(response) {
    return {type: COMP_COMPLETED, payload: response}
  }

  export function getComps() {
    return (dispatch) => {
      dispatch(compRequest())
      axios.get(BASE_URL + '/comps').then((response) => {
        dispatch(compSuccess(response))
      }).catch(err => {
        if (err.response) {
        dispatch(compFailure(err.response.data))
      }
      });
    }
  }

  export function updateComps(data) {
    return (dispatch) => {
      dispatch(compComplete(data))
      axios.put(BASE_URL + '/comps', data).then((response) => {
      }).catch(err => {
        dispatch(compFailure(err.response.data))
      });
  }
}
