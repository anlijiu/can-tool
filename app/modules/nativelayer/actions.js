import { createAction } from 'redux-actions';

import types from "./types"

export const syncMetaData = createAction(types.SYNC_META_DATA, (payload ) => ( payload ))
export const syncMetaDataSuccess = createAction(types.SYNC_META_DATA_SUCCESS, (payload ) => ( payload ))
export const syncMetaDataError = createAction(types.SYNC_META_DATA_ERROR, (payload ) => ( payload ))

export const setStrategy = createAction(types.SET_STRATEGY, (payload ) => ( payload ))
export const setStrategySuccess =  createAction(types.SET_STRATEGY_SUCCESS)
export const setWeapon = createAction(types.SET_WEAPON, (payload ) => ( payload ))
export const setWeaponSuccess = createAction(types.SET_WEAPON_SUCCESS)
export const getWeapons = createAction(types.GET_WEAPONS, (payload ) => ( payload ))
export const getWeaponsSuccess = createAction(types.GET_WEAPONS_SUCCESS, (payload ) => ( payload ))

export const fire = createAction(types.FIRE, (payload ) => ( payload ))
export const ceaseFire = createAction(types.CEASE_FIRE, (payload ) => ( payload ))
export const fireSuccess = createAction(types.FIRE_SUCCESS, (payload ) => ( payload ))
export const ceaseFireSuccess = createAction(types.CEASE_FIRE_SUCCESS, (payload ) => ( payload ))

export const arm = createAction(types.ARM, (payload ) => ( payload ))
export const disarm = createAction(types.DISARM, (payload ) => ( payload ))
export const armed = createAction(types.ARMED)
export const disarmed = createAction(types.DISARMED)

export default {
  syncMetaData,
  syncMetaDataSuccess,
  syncMetaDataError,
  setStrategy,
  setStrategySuccess,
  setWeapon,
  setWeaponSuccess,
  getWeapons,
  getWeaponsSuccess,
  fire,
  ceaseFire,
  fireSuccess,
  ceaseFireSuccess,
  arm,
  disarm,
  armed,
  disarmed
}
