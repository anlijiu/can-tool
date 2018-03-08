import { Observable } from 'rxjs/Observable'
import types from '../types'
import { getWeaponsSuccess } from '../actions'

const epics = (action$, store) => {
  return action$.ofType(types.GET_WEAPONS)
    .switchMap(action => Observable.from([ipcRenderer.send('action:get:weapons')])
      .flatMap(content => {
        console.log(content)
        return Observable.of(getWeaponsSuccess(content))
      })
    )
}

export default epics;
