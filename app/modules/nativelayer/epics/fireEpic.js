import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.FIRE),
    switchMap(action => {
      ipcRenderer.send('action:fire');
      return of(actions.fireSuccess())
    })
  )


export default epics;
