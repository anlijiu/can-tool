import {combineEpics, ofType} from 'redux-observable';
import { normalize, schema } from 'normalizr'
import { Observable, OperatorFunction, merge, defer, interval } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import types, { STOP_SEND_ACTION } from './types';
import { acquireReceivedMessages, acquireReceivedMessagesSuccess } from './actions';
import { sendingSelector, sendingStreamSelector } from './selectors'
import { acquireReceivedService } from './services'
import Schemas from '../../schemas'

const loopEepic = (action$, state$) =>
  action$.pipe(
    ofType(types.START_RECEIVED_LOOP),
    switchMap(action =>
      interval(200).pipe(
        map(acquireReceivedMessages()),
        takeUntil(action$.ofType(types.STOP_RECEIVED_LOOP))
      )
    )
  )


const acquireEpics = (action$, state$) =>
  action$.pipe(
    ofType(types.ACQUIRE_RECEIVED_MESSAGES),
    switchMap(action =>
      acquireReceivedService().pipe(
        flatMap(res => {
          const {entities, result} = normalize(res.messages, Schemas.MESSAGE_ARRAY)
          return of(acquireReceivedMessagesSuccess({
            entities: entities,
            result: result,
            unknown: res.unknown
          }))
        })
      ))
  )

const epics = combineEpics(
  loopEepic,
  acquireEpics
)



             // .catch((e, source) => {
             //   return Observable.of(getError(), source)
             //
             // })
export default epics;
