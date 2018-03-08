import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

import {
  LOAD_DBC_FILE,
  LOAD_DBC_FILE_SUCCESS
} from './types'

const initialState = {
  messageIds: [],
  entities: {
    messages: null,
    signals: null
  },
};


const reducer = handleActions({
  [LOAD_DBC_FILE]: (state, {payload}) => {
    return state
  },
  [LOAD_DBC_FILE_SUCCESS]: (state, {payload}) => {
    console.log(" LOAD_DBC_FILE_SUCCESS      payload => ", payload)
    return {
      ...state,
      messageIds: payload.ids,
      entities: {
        messages:  payload.messages,
        signals: payload.signals
      }
    }
  }
}, initialState);

export default reducer
