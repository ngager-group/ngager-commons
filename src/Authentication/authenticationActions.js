import * as types from './authenticationActionTypes';
import * as authenticationServices from './authenticationServices';

function loggedInSuccessfully({ data }) {
  return {
    type: types.LOGIN_SUCCESS,
    data,
  };
}

function loggedInFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function login(username, password) {
  return dispatch =>
    authenticationServices.login(username, password).then(resp => {
      if (resp) {
        dispatch(
          loggedInSuccessfully({
            data: {
              username: username,
              token: resp,
            },
          }),
        );
      } else {
        dispatch(loggedInFailed());
      }
    });
}

export function refreshToken() {
  return (dispatch, getState) => {
    const state = getState();
    const username = state.session.username;
    const token = state.session.token.refresh_token;
    return authenticationServices
      .refreshToken(username, token)
      .then(resp => {
        if (resp) {
          dispatch({
            type: types.DONE_REFRESH_TOKEN,
          });
          dispatch({
            type: types.LOGIN_SUCCESS,
            data: {
              username: state.session.username,
              token: resp,
            },
          });
          return resp;
        }
        dispatch({
          type: types.DONE_REFRESH_TOKEN,
        });
        dispatch({
          type: types.LOGIN_FAILED,
        });
        return null;
      })
      .catch(() => {
        dispatch({
          type: types.DONE_REFRESH_TOKEN,
        });
        dispatch({
          type: types.LOGIN_FAILED,
        });
        return null;
      });
  };
}

export function signOut() {
  return (dispatch, getState) => {
    const state = getState();
    authenticationServices.signOut(state.session.token.refresh_token);
    dispatch({
      type: types.LOGOUT,
    });
  };
}

export function saveUserAgreement(isAgreed) {
  return dispatch =>
    authenticationServices.saveUserAgreement(isAgreed).then(resp => {
      if (resp === true) {
        dispatch({
          type: types.SET_ACCEPTED_AGREEMENT,
        });
      }
    });
}

export default loggedInSuccessfully;
