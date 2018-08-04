import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.GET_WEAPONS),
    switchMap(action => from([ipcRenderer.send('action:get:weapons')]).pipe(
        flatMap(content => of(getWeaponsSuccess(content)))
      )
    )
  )


export default epics;
