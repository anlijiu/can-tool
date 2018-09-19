import { createSelector } from 'reselect'

import { dbcSelectors } from 'dbc'

export const sendSelector = state => state.send
export const sendingSelector = state => state.send.sending
export const focusedMessageSelector = state => state.send.focusedMessage
export const selectedMessageIdsSelector = state => state.send.selectedMessageIds
export const _signalOfFocusedMessage = state => state.send.focusedMessage ? state.send.focusedMessage.signals : []
export const sendingStreamSelector = state => state.send.stream

export const signalOfFocusedMessage = createSelector(
  _signalOfFocusedMessage,
  dbcSelectors.signalDefsSelector,
  (ids, signals) => {
    return ids.map(
      (id) => {
        return signals[id]
      }
    )
  }
)

export const selectedMessageSelector = createSelector(
  selectedMessageIdsSelector,
  dbcSelectors.messageDefsSelector,
  (ids, messages) => {
    return ids.map(
      (id) => {
        return messages[id]
      }
    )
  }
)


export default {
  sendSelector,
  sendingSelector,
  sendingStreamSelector,
  focusedMessageSelector,
  selectedMessageIdsSelector,
  selectedMessageSelector,
  signalOfFocusedMessage
};

