import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

import {
  START_SEND_ACTION,
  STOP_SEND_ACTION,
  SEND_ALREADY_STARTED,
  AFTER_START_SEND_ACTION,
  SELECT_MESSAGE_ACTION,
  SELECT_MESSAGE_LIST_ACTION,
  FOCUS_ON_MESSAGE_ACTION,
} from './types'

const emptyFrame = {
  id: -1,
  data: []
}
const initialState = {
  frames: [emptyFrame],
  sending: false,
  stream: null,
  focusedMessage: null,
  selectedMessageIds: []
};


const reducer = handleActions({
  [START_SEND_ACTION]: (state, {payload}) => (
    update(state, {
      sending: true,
    })
  ),
  [AFTER_START_SEND_ACTION]: (state, {payload}) => ({ ...state, stream: payload}),
  [SEND_ALREADY_STARTED]: (state) => state ,
  [SELECT_MESSAGE_LIST_ACTION] : (state, {payload}) => ({ ...state, selectedMessageIds: [...payload.ids ] }),
  [SELECT_MESSAGE_ACTION]:  (state, {payload}) => {
    console.log(payload)
    let ids = payload.isChecked ?  [
        ...state.selectedMessageIds,
        payload.id,
      ] : [
        ...state.selectedMessageIds.slice(0, payload.index),
        ...state.selectedMessageIds.slice(payload.index + 1)
      ];
    return {
      ...state,
      selectedMessageIds: ids
    }
  },
  [STOP_SEND_ACTION]: (state, {payload}) => {
    return {
      ...state,
      stream: null,
      sending: false,
    }
  },
  [FOCUS_ON_MESSAGE_ACTION]: (state, {payload}) => {
    return {
      ...state,
      focusedMessage: payload
    }
  }
}, initialState);

export default reducer
