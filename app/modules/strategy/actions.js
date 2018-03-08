import { createAction } from 'redux-actions';

import types from "./types";

export const init = createAction(types.INIT, ( payload ) => ( payload ))
export const add = createAction(types.ADD, payload => payload )
export const minus = createAction(types.MINUS, payload => payload )
export const changeType = createAction(types.CHANGE_TYPE, ( payload ) => ( payload ))
export const setValue = createAction(types.SET_VALUE, ( payload ) => ( payload ))

export default {
  init,
  add,
  minus,
  setValue,
  changeType
}
