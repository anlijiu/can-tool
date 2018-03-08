import { Observable } from 'rxjs/Observable'
import types from '../types'

const epics = (action$, store) => {
  return action$.ofType(types.DISARM)
  .switchMap(action => Observable.from([ipcRenderer.send('action:disarm')]))
}

export default epics;
