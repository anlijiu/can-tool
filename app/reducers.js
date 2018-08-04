import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as notifications } from 'react-notification-system-redux'
import {
  persistStore,
  persistCombineReducers, autoRehydrate
} from 'redux-persist'
import home from 'home'
import send from 'send'
import receive from 'receive'
import entities from 'entities'
import dbc from 'dbc'
import strategy from 'strategy'
import hasRehydrated from './modules/persist'
import createElectronStorage from './storage'



const config = {
  key: 'root',
  storage: createElectronStorage(),
  debug: true,
  blacklist: ['router', 'receive']
};


export const reducers = (asyncReducers) => {
  return {
    notifications,
    hasRehydrated,
    home,
    send,
    receive,
    strategy,
    entities,
    dbc,
    // ui: uiReducer,
    router: routerReducer,
    ...asyncReducers
  }

}


const makeRootReducer = (asyncReducers) => {
  return persistCombineReducers(config, reducers(asyncReducers))
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
