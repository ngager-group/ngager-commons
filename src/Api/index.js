/* eslint no-undef: 0 */
/* global __API__:true */
/* global __SUBSCRIPTION_KEY__:true */
/* eslint prefer-object-spread: 0 */
import { storeConfig } from '../AppStore';
import { refreshToken, isExpired } from '../Authentication/authMiddleware';

export function errorHandling(error) {
  console.log('ERROR errorHandling', error);
  if (error instanceof Error) {
    return error;
  }
  try {
    if (error.errors && Array.isArray(error.errors)) {
      return error.errors.map(e => new Error(e.message));
    }
    if (error.message) {
      return new Error(error.message);
    }
    return error;
  } catch (e) {
    return error;
  }
}

class Api {
  static headers(session, currentInstance) {
    let headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      dataType: 'json',
      'Ocp-Apim-Subscription-Key': __SUBSCRIPTION_KEY__,
    };

    if (session.token) {
      headers = Object.assign(headers, {
        Authorization: `${session.token.token_type} ${session.token.access_token}`,
      });
    }

    if (currentInstance) {
      headers = Object.assign(headers, {
        Instance: currentInstance.id,
      });
    }
    return headers;
  }

  static get(route, headers) {
    return this.xhr(route, null, headers, 'GET');
  }

  static put(route, params, headers) {
    return this.xhr(route, params, headers, 'PUT');
  }

  static post(route, params, headers, isEncodeData, isFormData) {
    return this.xhr(route, params, headers, 'POST', isEncodeData, isFormData);
  }

  static delete(route, params, headers) {
    return this.xhr(route, params, headers, 'DELETE');
  }

  static encodeData(data) {
    return Object.keys(data)
      .map(key => [key, data[key]].map(encodeURIComponent).join('='))
      .join('&');
  }

  static getSession(route, state) {
    const nonAuthenticatedEndpoints = state.nonAuthenticatedEndpoints || [];
    if (!nonAuthenticatedEndpoints.includes(route) && isExpired(state.session.token)) {
      // Call refresh token
      const refreshTokenPromise = state.refreshTokenPromise
        ? state.refreshTokenPromise
        : refreshToken(storeConfig.store.dispatch, state);
      if (!(refreshTokenPromise instanceof Promise) || refreshTokenPromise === false) {
        console.log('Error', 'Refresh token promise is invalid');
        return Promise.resolve(null);
      }
      return refreshTokenPromise.then(resp => {
        if (resp) {
          return Promise.resolve({
            username: state.session.username,
            token: resp,
          });
        }
        return Promise.resolve(null);
      });
    }
    return Promise.resolve(state.session);
  }

  static xhr(route, params, headers, verb, isEncodeData, isFormData) {
    const host = __API__;
    const state = storeConfig.store.getState();
    const currentInstance = state.currentInstance;
    return Api.getSession(route, state).then(session => {
      if (!session) {
        console.log('verb route', verb, route);
        window.location.href = '/login';
      }
      let url = '';
      if (route.indexOf('http') !== -1) {
        url = route;
      } else {
        url = `${host}${route}`;
      }
      const formData = isFormData ? params : JSON.stringify(params);
      const options = Object.assign(
        { method: verb },
        params ? { body: isEncodeData ? this.encodeData(params) : formData } : null,
      );
      options.headers = Api.headers(session, currentInstance);
      if (headers) {
        options.headers = Object.assign({}, options.headers, headers);
      }
      return fetch(url, options)
        .then(resp => {
          const json = resp.json();
          if (resp.ok) {
            return json;
          }
          return json.then(err => {
            throw err;
          });
        })
        .then(json => json);
    });
  }

  static upload(route, file, onProgressCallback, signal = null) {
    if (signal && signal.aborted) {
      return Promise.reject(new DOMException('Aborted', 'AbortError'));
    }
    const host = __API__;
    const state = storeConfig.store.getState();
    const currentInstance = state.currentInstance;
    return Api.getSession(route, state).then(session => {
      if (!session) {
        console.log('verb route', route);
        window.location.href = '/login';
      }
      return new Promise((resolve, reject) => {
        let url = '';
        if (route.indexOf('http') !== -1) {
          url = route;
        } else {
          url = `${host}${route}`;
        }
        const body = new FormData();
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        let headers = {};
        if (session.token && currentInstance) {
          headers = Object.assign(headers, {
            Authorization: `${session.token.token_type} ${session.token.access_token}`,
            Instance: currentInstance.id,
          });
        }
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key]);
        });
        body.append('file', file);
        if (file.instanceId) {
          body.append('InstanceId', file.instanceId);
        }
        if (file.fileCategoryType) {
          body.append('fileCategoryType', file.fileCategoryType);
        }
        if (file.sendProgresReport !== undefined) {
          body.append('sendProgressReport', file.sendProgresReport);
        }
        if (file.useFileName !== undefined) {
          body.append('useFileName', file.useFileName);
        }
        if (file.id !== undefined) {
          body.append('id', file.id);
        }
        if (file.correlatedObjectId !== undefined) {
          body.append('correlatedObjectId', file.correlatedObjectId);
        }
        if (file.feature !== undefined) {
          body.append('feature', file.feature);
        }
        if (file.skipTranscoding !== undefined) {
          body.append('skipTranscoding', file.skipTranscoding);
        }
        if (file.skipTranscode !== undefined) {
          body.append('skipTranscode', file.skipTranscode);
        }
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.statusText.toLowerCase() === 'ok') {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.statusText);
          }
        };
        // xhr.onerror = reject;
        xhr.onerror = err => {
          console.log('onerror', err);
          reject(err);
        };
        xhr.onabort = err => {
          console.log('onabort', err);
          reject('abort');
        };
        if (onProgressCallback) {
          xhr.upload.onprogress = onProgressCallback;
        }
        if (signal) {
          signal.addEventListener('abort', () => xhr.abort());
        }
        xhr.send(body);
        // setTimeout(() => xhr.abort(), 2000);
      });
    });
  }

  static fetch(route, headers = null) {
    const host = __API__;
    const state = storeConfig.store.getState();
    const currentInstance = state.currentInstance;
    return Api.getSession(route, state).then(session => {
      if (!session) {
        console.log('route', route);
        window.location.href = '/login';
      }
      let url = '';
      if (route.indexOf('http') !== -1) {
        url = route;
      } else {
        url = `${host}${route}`;
      }
      const options = Object.assign({ method: 'GET' });
      options.headers = {
        'Ocp-Apim-Subscription-Key': __SUBSCRIPTION_KEY__,
      };
      if (session.token) {
        options.headers.Authorization = `${session.token.token_type} ${session.token.access_token}`;
      }
      if (currentInstance) {
        options.headers.Instance = currentInstance.id;
      }
      if (headers) {
        options.headers = Object.assign({}, options.headers, headers);
      }
      return fetch(url, options).then(resp => {
        if (!resp.ok) {
          throw new Error(resp);
        }
        console.log(resp.ok);
        return resp;
      });
    });
  }
}
export default Api;
