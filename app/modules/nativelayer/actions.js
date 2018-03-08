import { createAction } from 'redux-actions';

import types from "./types"

export const syncMetaData = createAction(types.SYNC_META_DATA, (payload ) => ( payload ))
export const syncMetaDataSuccess = createAction(types.SYNC_META_DATA_SUCCESS, (payload ) => ( payload ))
export const syncMetaDataError = createAction(types.SYNC_META_DATA_ERROR, (payload ) => ( payload ))

export const setStrategy = createAction(types.SET_STRATEGY, (payload ) => ( payload ))

export const setWeapon = createAction(types.SET_WEAPON, (payload ) => ( payload ))
export const getWeapons = createAction(types.GET_WEAPONS, (payload ) => ( payload ))
export const getWeaponsSuccess = createAction(types.GET_WEAPONS_SUCCESS, (payload ) => ( payload ))

export const fire = createAction(types.FIRE, (payload ) => ( payload ))
export const ceaseFire = createAction(types.CEASE_FIRE, (payload ) => ( payload ))

export const arm = createAction(types.ARM, (payload ) => ( payload ))
export const disarm = createAction(types.DISARM, (payload ) => ( payload ))

export default {
  syncMetaData,
  syncMetaDataSuccess,
  syncMetaDataError,
  setStrategy,
  setWeapon,
  getWeapons,
  getWeaponsSuccess,
  fire,
  ceaseFire,
  arm,
  disarm
}
