import * as types from './persistTypes';
import createReducer from '../CreateReducer';

export const isHydrated = createReducer(false, {
  [types.UPDATE](state, action) {
    return action.isHydrated;
  },
});

export default isHydrated;
