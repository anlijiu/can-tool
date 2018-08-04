import types from './types';
import { startSend, stopSend, afterStartSend, sendAlreadyStarted } from './actions';
import { sendingSelector, sendingStreamSelector } from './selectors'

import { Observable, OperatorFunction, merge, defer, interval, of } from "rxjs";
import { switchMap, takeUntil, map } from "rxjs/operators";
import { ofType } from 'redux-observable';

const epics = (action$, state$) =>
action$.pipe(
  ofType(types.START_SEND_ACTION),
  switchMap((action) => {
      if(sendingSelector(state$)) {
        return of(sendAlreadyStarted());
      } else {
        return of(afterStartSend(interval(100).pipe(
          map(x => { console.log("hahahahaa  send ")}),
          takeUntil(action$.ofType(types.STOP_SEND_ACTION))
        )))
      }
  }

  )
)

  // return action$.ofType(types.START_SEND_ACTION)
  //   .switchMap(action => {
  //     return sendingSelector(store) ? sendingStreamSelector(store) :
  //       Observable.defer( () => {
  //         const observable = Rx.Observable.interval( 100 )
  //           .takeUntil(action$.ofType(STOP_SEND_ACTION))
  //           .do(() => {
  //             console.log("hahahahaahah  send")
  //           })
  //         return observable
  //       })
  //   })

             // .catch((e, source) => {
             //   return Observable.of(getError(), source)
             //
             // })
export default epics;
