import { Observable } from 'rxjs/Observable'
import types from '../types'

const { ipcRenderer } = require('electron')

const epics = (action$, store) => {
  return action$.ofType(types.SET_WEAPON)
    .switchMap(action => Observable.from([ipcRenderer.send('action:set:weapon', action.payload)]))
}

export default epics;
