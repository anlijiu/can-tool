/* REDUCER(S)
*/

import { handleActions } from 'redux-actions';
import { omit } from "lodash";
import update from 'immutability-helper';
import { mergeDeep } from '../../utils/mergeDeep'
import deepMerge from 'deepmerge';

import types from "./types";

const initialState = {
  receiving: false,
  expandIds: [],
  msgIds: [],
  messages: {},
  signals: {},
  unknownIds: [],
  unknowns: {},
};

function mergeMessages(oldMessages, newMessages) {
  let messages = deepMerge(oldMessages, newMessages);
  Object.keys(messages).map(key => messages[key].signals = [...new Set(messages[key].signals)]);
  return messages;
}

const reducer = handleActions({
  [types.START_RECEIVED_LOOP]: (state, { payload }) => {
    return state
  },
  [types.STOP_RECEIVED_LOOP]: (state, { payload }) => {
    return state
  },
  [types.ACQUIRE_RECEIVED_MESSAGES_SUCCESS]: (state, { payload }) => {
    return {
      ...state,
      msgIds: [...new Set([...state.msgIds, ...payload.msgIds])],
      messages: mergeMessages(state.messages, payload.messages),
      signals: deepMerge(state.signals, payload.signals),
      unknownIds: [...new Set([...state.unknownIds, ...payload.unknownIds])],
      unknowns: deepMerge(state.unknowns, payload.unknowns),
    }
  },
  [types.ACQUIRE_RECEIVED_MESSAGES]: (state, {payload}) => {
    // console.log("reduce  ACQUIRE_RECEIVED_MESSAGES is  ", payload)
    return state
  },
  [types.TOGGLE_MESSAGE]: (state, {payload}) => {
    return state.expandIds.includes(payload) ? update(state, {
      expandIds: arr => arr.filter(item => item != payload),
    }) : update(state, {
      expandIds: {$push: [payload]}
    })
  },
}, initialState);

export default reducer;
