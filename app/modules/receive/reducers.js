/* REDUCER(S)
*/

import { handleActions } from 'redux-actions';
import { omit } from "lodash";
import update from 'immutability-helper';
import { mergeDeep } from '../../utils/mergeDeep'

import types from "./types";

const initialState = {
  receiving: false,
  expandIds: [],
  entities: {
    messages: {}
  },
  msgIds: [],

  known: {},
  unknown: []
};

const reducer = handleActions({
  [types.START_RECEIVED_LOOP]: (state, { payload }) => {
    return state
  },
  [types.STOP_RECEIVED_LOOP]: (state, { payload }) => {
    console.log("redusers  STOP_RECEIVED_LOOP   is  ", payload)
    return state
  },
  [types.ACQUIRE_RECEIVED_MESSAGES_SUCCESS]: (state, { payload }) => {
    console.log(" redusers ACQUIRE_RECEIVED_MESSAGES_SUCCESS       ", state, payload, payload.entities.messages)
    return {
      ...state,
      entities: {...state.entities, messages: mergeDeep(state.entities.messages, payload.entities.messages)},
      msgIds: state.msgIds.concat(payload.result).filter((item, index) => payload.result.indexOf(item) === index)
    }
    // return update(state, {
    //   entities: {$merge: mergeDeep(state.entities, payload.entities)},
    //   msgIds:  {$merge: mergeDeep(state.msgIds, payload.result)},
    //   known: {$merge: mergeDeep(state.known, payload.message)},
    //   unknown: {$merge: mergeDeep(state.unknown, payload.unknown)}
    // })
  },
  [types.ACQUIRE_RECEIVED_MESSAGES]: (state, {payload}) => {
    // console.log("reduce  ACQUIRE_RECEIVED_MESSAGES is  ", payload)
    return state
  },
  [types.TOGGLE_MESSAGE]: (state, {payload}) => {
    console.log("reduce  TOGGLE_MESSAGE  is  ", payload)
    return state.expandIds.includes(payload) ? update(state, {
      expandIds: arr => arr.filter(item => item != payload),
    }) : update(state, {
      expandIds: {$push: [payload]}
    })
    // if(state.expandIds.includes(payload)) {
    //   return update(state, {
    //     expandIds: arr => arr.filter(item => item != payload),
    //   })
    // } else {
    //
    // }
    // return state
  },
}, initialState);

export default reducer;
