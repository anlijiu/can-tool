import { handleActions } from 'redux-actions'
import update from 'immutability-helper'

import {
  GET_WEAPONS_SUCCESS
} from './types'

const initialState = {
  weapons: [],
};


const reducer = handleActions({
  [GET_WEAPONS_SUCCESS]: (state, {payload}) => {
    console.log(" GET_WEAPONS_SUCCESS payload => ", payload)
    return {
      ...state,
      weapons: payload
    }
  }
}, initialState);

export default reducer
