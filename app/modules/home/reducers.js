import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

import {
  SHOW_TAB,
} from './types'

const initialState = {
  activeTab: "/send"
};


const reducer = handleActions({
  [SHOW_TAB]: (state, {payload}) => {
    return update(state, {
      activeTab: {$set: payload},
    })
  }
}, initialState);

export default reducer
