import { Observable } from 'rxjs/Observable';
import types, { STOP_SEND_ACTION } from './types';
import { startSend, stopSend, afterStartSend } from './actions';
import { sendingSelector, sendingStreamSelector } from './selectors'

const epics = (action$, store) => {
  return action$.ofType(types.START_SEND_ACTION)
    .switchMap(action => {
      return sendingSelector(store) ? sendingStreamSelector(store) :
        Observable.defer( () => {
          const observable = Rx.Observable.interval( 100 )
            .takeUntil(action$.ofType(STOP_SEND_ACTION))
            .do(() => {
              console.log("hahahahaahah  send")
            })
          return observable
        })
    })
}

             // .catch((e, source) => {
             //   return Observable.of(getError(), source)
             //
             // })
export default epics;
