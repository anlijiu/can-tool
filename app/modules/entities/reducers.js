/* REDUCER(S)
数据仓库， 可以看做客户端内存数据库
*/

import { handleActions } from 'redux-actions';
import { omit } from "lodash";
import { mergeDeep } from '../../utils/mergeDeep'

import types from "./types";

const initialState = {
  messages: null,
  signals: null,
};

const reducer = handleActions({
  [types.UPDATE]: (state, { payload }) => Object.assign({}, mergeDeep(state, payload)),
  [types.CLEAR_BY_KEY]: (state, { payload }) => state[schemaName] ? omit(state, [payload]) : state,
}, initialState);

export default reducer;
