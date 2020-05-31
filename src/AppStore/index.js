/* global __LOCAL__:true */
/* eslint no-underscore-dangle: 0 */

import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import * as logger from 'redux-logger';
import { update } from './persist/persistActions';

const createLogger = logger.createLogger;

export const storeConfig = {};

export default function configureStore(initialState, rootReducer, middleWares = {}, blacklist = []) {
  return new Promise((resolve, reject) => {
    try {
      const logger = createLogger({
        predicate: () => __LOCAL__,
      });
      const enhancer = compose(applyMiddleware(...middleWares, thunkMiddleware, logger));
      const persistConfig = {
        key: 'root',
        storage,
        blacklist,
      };
      const persistedReducer = persistReducer(persistConfig, rootReducer);
      const store = createStore(persistedReducer, initialState, enhancer);

      const persistor = persistStore(store, null, () => {
        store.dispatch(update({ isHydrated: true }));
        resolve(storeConfig);
      });
      Object.assign(storeConfig, { store, persistor });
    } catch (e) {
      reject(e);
    }
  });
}
