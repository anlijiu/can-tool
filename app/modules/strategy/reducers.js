/* REDUCER(S)
*/

import { handleActions } from 'redux-actions';
import { omit } from "lodash";
import { mergeDeep } from '../../utils/mergeDeep'

import types from "./types";

const initialState = {};

const reducer = handleActions({
  [types.INIT]: (state, { payload }) => {
    return payload;
  },
  [types.ADD]: (state, { payload }) => {
    console.log("strategey reducer add payload is ", payload,
      " state[payload].value+1 is ", state[payload].value+1,
      " state[payload].maximum is ", state[payload].max,
      " state[payload].minimum is ", state[payload].min )

    let value = state[payload].value+1 > state[payload].max ?  state[payload].max : state[payload].value+1
    return {
      ...state,
      [payload]: {
        ...state[payload],
        value: value}
    }
  },
  [types.MINUS]: (state, { payload }) => {
    console.log("strategey reducer add payload is ", payload,
      " state[payload].value-1 is ", state[payload].value-1,
      " state[payload].maximum is ", state[payload].max,
      " state[payload].minimum is ", state[payload].min )
    let value = state[payload].value-1 < state[payload].min ?  state[payload].min : state[payload].value-1
    return {
      ...state,
      [payload]: {
        ...state[payload],
        value: value}
    }
  },
  [types.SET_VALUE]: (state, {payload}) => {
    console.log(" strategey reducer add payload is ", payload)
    return  {
      ...state,
      [payload.key]: {
        ...state[payload.key],
        value: isNaN(payload.value) ? 0 : payload.value}
    }
  }
}, initialState);

export default reducer;
