import * as types from './authenticationActionTypes';
import * as authenticationServices from './authenticationServices';

const moment = require('moment');

export function refreshToken(dispatch, state) {
  const username = state.session.username || null;
  const token = state.session.token ? state.session.token.refresh_token : null;
  if (!username || !token) {
    dispatch({
      type: types.DONE_REFRESH_TOKEN,
    });
    dispatch({
      type: types.LOGIN_FAILED,
    });
    return null;
  }
  const refreshTokenPromise = authenticationServices.refreshToken(username, token).then(resp => {
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
  });

  // Api.post(ENDPOINT.AUTH.LOGIN, {
  //   grant_type: 'refresh_token',
  //   username: state.session.username,
  //   refresh_token: state.session.token.refresh_token,
  // }, null, true).then((resp) => {
  //   dispatch({
  //     type: types.DONE_REFRESH_TOKEN,
  //   });
  //   dispatch({
  //     type: types.LOGIN_SUCCESS,
  //     data: {
  //       username: state.session.username,
  //       token: resp,
  //     },
  //   });
  //   return resp ? Promise.resolve(resp) : Promise.reject({
  //     message: 'could not refresh token',
  //   });
  // }).catch((ex) => {
  //   console.log('exception refresh_token', ex);
  //   dispatch({
  //     type: types.DONE_REFRESH_TOKEN,
  //   });
  //   dispatch({
  //     type: types.LOGIN_FAILED,
  //     exception: ex,
  //   });
  // });

  dispatch({
    type: types.REFRESH_TOKEN,
    // we want to keep track of token promise in the state so that we don't try to refresh
    // the token again while refreshing is in process
    refreshTokenPromise,
  });

  return refreshTokenPromise;
}

export function isExpired(token) {
  if (!token || token === undefined) {
    return true;
  }
  const currentTime = new Date();
  // Token is also expired with only 15s alive
  const expiredDate = moment(new Date(token['.expires'])).add(-15, 's');
  return currentTime > expiredDate;
}

export default function authMiddleware({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      const state = getState();
      if (state) {
        if (state.isAuthenticated && state.session.token && isExpired(state.session.token)) {
          // make sure we are not already refreshing the token
          if (
            !(state.refreshTokenPromise instanceof Promise) ||
            state.refreshTokenPromise === false
          ) {
            return refreshToken(dispatch, state).then(() => next(action));
          }

          return state.refreshTokenPromise.then(() => next(action));
        }
      }
    }
    return next(action);
  };
}
