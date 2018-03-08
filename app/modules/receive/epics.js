import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { normalize, schema } from 'normalizr'

import types, { STOP_SEND_ACTION } from './types';
import { acquireReceivedMessages, acquireReceivedMessagesSuccess } from './actions';
import { sendingSelector, sendingStreamSelector } from './selectors'
import { acquireReceivedService } from './services'
import Schemas from '../../schemas'

const loopEepic = (action$, store) => {
  return action$.ofType(types.START_RECEIVED_LOOP)
    .switchMap(
      action => {
        console.log("  receive loopEepic in     for START_RECEIVED_LOOP ")
        return Observable.interval( 200 )
          .mapTo(acquireReceivedMessages())
          .takeUntil(action$.ofType(types.STOP_RECEIVED_LOOP))
      }
    )
  }


const acquireEpics = (action$, store) => {
  return action$.ofType(types.ACQUIRE_RECEIVED_MESSAGES)
    .switchMap(action => acquireReceivedService()
      .flatMap(res => {
        console.log("receive  epics   acquireReceivedService success is ", res)
        const {entities, result} = normalize(res.messages, Schemas.MESSAGE_ARRAY)
        return Observable.of(
          acquireReceivedMessagesSuccess({
            entities: entities,
            result: result,
            unknown: res.unknown
          })
        )
      })
    )
  }

const epics = combineEpics(
  loopEepic,
  acquireEpics
)



             // .catch((e, source) => {
             //   return Observable.of(getError(), source)
             //
             // })
export default epics;
