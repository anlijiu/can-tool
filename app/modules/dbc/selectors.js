import { createSelector } from 'reselect'


const messagesIdsSelector = state => state.dbc.messageIds

export const messageDefsSelector = state => state.dbc.entities.messages
export const signalDefsSelector = state => state.dbc.entities.signals

export const messagesSelector = createSelector(
  messagesIdsSelector,
  messageDefsSelector,
  (ids, messages) => {
    return ids.map(
      (id) => {
        return messages[id]
      }
    )
  }
)

export default {
  messagesSelector,
  messageDefsSelector,
  signalDefsSelector
};
