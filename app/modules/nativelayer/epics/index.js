import armEpic from './armEpic'
import disarmEpic from './disarmEpic'
import getWeaponsEpic from './getWeaponsEpic'
import setStrategyEpic from './setStrategyEpic'
import syncMetaEpic from './syncMetaEpic'
import ceaseFireEpic from './ceaseFireEpic'
import fireEpic from './fireEpic'
import setWeaponEpic from './setWeaponEpic'

import { combineEpics } from 'redux-observable';


const epics = (action$, store) => combineEpics(
  armEpic,
  disarmEpic,
  getWeaponsEpic,
  setStrategyEpic,
  syncMetaEpic,
  ceaseFireEpic,
  fireEpic,
  setWeaponEpic
)(action$, store)
  .catch((error, stream) => {
    console.log(error)
    console.log(stream)
    return stream
  })


export default epics
