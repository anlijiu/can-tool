import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.DISARM),
    switchMap(action => {
      ipcRenderer.send('action:disarm');
      return of(actions.disarmed())
    })
  )

export default epics;
