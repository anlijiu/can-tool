import { createAction } from 'redux-actions';

import types from "./types";

export const startReceiveLoop = createAction(types.START_RECEIVED_LOOP, payload => payload)
export const stopReceiveLoop = createAction(types.STOP_RECEIVED_LOOP, payload => payload)
export const acquireReceivedMessagesSuccess = createAction(types.ACQUIRE_RECEIVED_MESSAGES_SUCCESS, payload => payload)
export const acquireReceivedMessages = createAction(types.ACQUIRE_RECEIVED_MESSAGES, payload => payload)
export const toggleMessage = createAction(types.TOGGLE_MESSAGE, payload => payload)

export default {
  startReceiveLoop,
  stopReceiveLoop,
  acquireReceivedMessagesSuccess,
  acquireReceivedMessages,
  toggleMessage,
}
