import { createAction } from 'redux-actions';

import types from "./types";

export const update = createAction(types.UPDATE, ( payload ) => ( payload ))
export const clearByKey = createAction(types.CLEAR_BY_KEY, ( payload ) => ( payload ))


export default {
  update,
  clearByKey,
}
