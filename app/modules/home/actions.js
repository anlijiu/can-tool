/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import { createAction } from 'redux-actions';

import types from "./types"

export const showTab = createAction(types.SHOW_TAB, ( payload ) => ( payload ))

export default {
  showTab,
}
