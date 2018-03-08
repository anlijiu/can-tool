import { Observable } from 'rxjs/Observable'
import types from '../types'

const epics = (action$, store) => {
  return action$.ofType(types.ARM)
    .switchMap(action => Observable.from([ipcRenderer.send('action:arm')]))
}

export default epics;
