import createReducer from '../utils/createReducer';
import * as types from './authenticationActionTypes';

export const isAuthenticated = createReducer(false, {
  [types.LOGIN_SUCCESS]() {
    return true;
  },
  [types.LOGIN_FAILED]() {
    return false;
  },
});

export const session = createReducer(
  {},
  {
    [types.LOGIN_SUCCESS](state, action) {
      return action.data;
    },
    [types.SET_CREDENTIAL](state, action) {
      const newSession = {};
      newSession.username = action.username;
      return newSession;
    },
    [types.GET_CURRENT_USER](state, action) {
      const newSession = Object.assign({}, state);
      newSession.currentUser = action.user;
      return newSession;
    },
  }
);

export const refreshTokenPromise = createReducer(false, {
  [types.REFRESH_TOKEN](state, action) {
    return action.refreshTokenPromise;
  },
  [types.DONE_REFRESH_TOKEN]() {
    return false;
  },
});
