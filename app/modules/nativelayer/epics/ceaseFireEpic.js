import { Observable } from 'rxjs/Observable'
import types from '../types'

const epics = (action$, store) => {
  return action$.ofType(types.CEASE_FIRE)
  .switchMap(action => Observable.from([ipcRenderer.send('action:ceasefire')]))
}

export default epics;
