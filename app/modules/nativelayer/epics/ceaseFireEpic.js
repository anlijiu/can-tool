import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.CEASE_FIRE),
    switchMap(action => {
      ipcRenderer.send('action:ceasefire');
      return of(actions.ceaseFireSuccess())
    })
  )

export default epics;
