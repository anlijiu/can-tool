import { createSelector } from 'reselect'

import { entitiesSelectors } from 'entities'



export const messagesIdsSelector = state => state.dbc.messageIds


export const messagesSelector = createSelector(
  messagesIdsSelector,
  entitiesSelectors.entitiesMessagesSelector,
  (ids, messages) => {
    return ids.map(
      (id) => {
        return messages[id]
      }
    )
  }
)

export default {
  messagesSelector: messagesSelector,
};
