import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const { ipcRenderer } = require('electron')

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.SET_WEAPON),
    switchMap(action => {
      ipcRenderer.send('action:set:weapon', action.payload);
      return of(actions.setWeaponSuccess())
    })
  )

export default epics;
