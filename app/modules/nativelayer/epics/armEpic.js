import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.ARM),
    switchMap(action => {
      ipcRenderer.send('action:arm');
      return of(actions.armed())
    })
  )


export default epics;
