/* ACTION CREATOR FUNCTIONS

Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects

*/

import { createAction } from 'redux-actions';

import { PURGE } from "redux-persist";

export const purge = createAction(PURGE)

export default {
  purge
}
