import {combineEpics, ofType} from 'redux-observable';
import { normalize, schema } from 'normalizr'
import { Observable, OperatorFunction, merge, defer, interval, of} from "rxjs";
import { switchMap, takeUntil, mapTo, flatMap, map } from "rxjs/operators";
import types, { STOP_SEND_ACTION } from './types';
import { acquireReceivedMessages, acquireReceivedMessagesSuccess } from './actions';
import { sendingSelector, sendingStreamSelector } from './selectors'
import { acquireReceivedData, acquireReceivedService } from './services'
import Schemas from '../../schemas'


const acquireEpics = (action$, state$) =>
  action$.pipe(
    ofType(types.ACQUIRE_RECEIVED_MESSAGES),
    switchMap(action => {
      const { payload, type } = action;
      const { entities, result } = normalize(payload.messages, Schemas.MESSAGE_ARRAY);
      const unknownArray = normalize(payload.unknowns, Schemas.UNKNOWN_MESSAGE_ARRAY);
      return of(acquireReceivedMessagesSuccess({
        messages: entities.messages||{},
        signals: entities.signals||{},
        msgIds: result||[],
        unknowns: unknownArray.entities.unknowns||{},
        unknownIds: unknownArray.result||[]
      }))
    })
  )

const epics = combineEpics(
  acquireEpics
)



             // .catch((e, source) => {
             //   return Observable.of(getError(), source)
             //
             // })
export default epics;
