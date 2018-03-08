import { Observable } from 'rxjs/Observable'
import types from '../types'
import actions from '../actions'

const { ipcRenderer } = require('electron')

const epics = (action$, store) => {
  return action$.ofType(types.SYNC_META_DATA)
    .switchMap(action => {
      const { messages, signals, strategies } = action.payload
    // ipcRenderer.sendSync('action:sync:meta',messages, signals, strategies)

      const result = ipcRenderer.send('action:sync:meta',messages, signals, strategies)

      return Observable.of(result === 'done' ? actions.syncMetaDataSuccess() : actions.syncMetaDataError())
    })
    // .do(action => ipcRenderer.sendSync('action:sync:meta', action.payload))
    // .do(action => Observable.from([ipcRenderer.sendSync('action:sync:meta', action.payload)]))
    // .switchMap()
}

export default epics;
