import { Observable, OperatorFunction, merge } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from '../types'
import actions from '../actions'

const { ipcRenderer } = require('electron')

const epics = (action$, state$) =>
  action$.pipe(
    ofType(types.SYNC_META_DATA),
    switchMap(action => {
      const { messages, signals, strategies } = action.payload
      // ipcRenderer.sendSync('action:sync:meta',messages, signals, strategies)

      const result = ipcRenderer.send('action:sync:meta',messages, signals, strategies)

      return of(result === 'done' ? actions.syncMetaDataSuccess() : actions.syncMetaDataError())
    })
  )

export default epics;
