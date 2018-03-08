/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import { createAction } from 'redux-actions';

import types from "./types"

export const startSend = createAction(types.START_SEND_ACTION)
export const stopSend = createAction(types.STOP_SEND_ACTION, ( payload = { message: "stop" } ) => ( payload ))
export const afterStartSend = createAction(types.AFTER_START_SEND_ACTION, ( payload ) => ( payload ))
export const selectMessage = createAction(types.SELECT_MESSAGE_ACTION, ( payload ) => ( payload ))
export const focusOnMessage = createAction(types.FOCUS_ON_MESSAGE_ACTION, payload => payload)
export default {
  startSend,
  stopSend,
  afterStartSend,
  selectMessage,
  focusOnMessage
}