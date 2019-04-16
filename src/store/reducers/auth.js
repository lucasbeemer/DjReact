import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

// INITIAL (default) STATE
const initialState = {
  token: null,
  error: null,
  loading: false
};

// Actions are received in the Reducer as a parameter

// auth START method
const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

// auth SUCCESS method
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    error: null,
    loading: false
  });
};

// auth FAIL method
const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

// auth LOGOUT method
const authLogout = (state, action) => {
  return updateObject(state, {
    token: null
  });
};

// The REDUCER takes in all the TYPES of ACTIONS,
// Then it defines which method to execute, depending on TYPE of ACTION
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};

export default reducer;
