/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import { createAction } from 'redux-actions';

import types from "./types"

export const loadDbcFile = createAction(types.LOAD_DBC_FILE, (payload ) => ( payload ))
export const loadDbcFileSuccess = createAction(types.LOAD_DBC_FILE_SUCCESS, (payload ) => ( payload ))

export default {
  loadDbcFile: loadDbcFile,
  loadDbcFileSuccess: loadDbcFileSuccess
}
