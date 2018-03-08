import { Observable } from 'rxjs/Observable'
import types from '../types'

const { ipcRenderer } = require('electron')

const epics = (action$, store) => {
  return action$.ofType(types.SET_STRATEGY)
    .switchMap(action => Observable.from([ipcRenderer.send('action:set:strategy', action.payload)]))
}

export default epics;