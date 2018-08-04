import { Observable, OperatorFunction, merge, bindNodeCallback, of } from "rxjs";
import { switchMap, takeUntil, flatMap, map } from "rxjs/operators";
import { ofType } from 'redux-observable';
import types from './types'
import { camelizeKeys } from 'humps'
import { normalize, schema } from 'normalizr'
import { loadDbcFile, loadDbcFileSuccess } from './actions'
import { strategyActions } from "strategy";
import { nativeActions } from "nativelayer";
import fs from 'fs'
import Schemas from '../../schemas'
import { entitiesActions } from '../entities'

const epics = (action$, store) =>
action$.pipe(
  ofType(types.LOAD_DBC_FILE),
  switchMap(action => bindNodeCallback(fs.readFile)(action.payload.shift()).pipe(
    map(v => (v).toString('utf8')),
    flatMap(content => {
      const message = JSON.parse(content).candb.message
      console.log(" message     are   ", message, "  candb is ", JSON.parse(content).candb);
      const {entities, result} = normalize(JSON.parse(content).candb.message, Schemas.MESSAGE_ARRAY)
      console.log(" entities     is    ", entities, " result is", result)
      let strategies = {};

      Object.keys(entities.signals).forEach(key => strategies[key] = {
        type: 'const',
        value: 0,
        max: Number(entities.signals[key].maximum),
        min: Number(entities.signals[key].minimum)
      })

      // return Observable.of(loadDbcFileSuccess(JSON.parse(content)))
      return of(
        entitiesActions.update(entities),
        loadDbcFileSuccess({
          ids: result,
          messages: entities.messages,
          signals: entities.signals,
        }),
        strategyActions.init(strategies), //根据signal初始化每个信号对应的策略
        nativeActions.syncMetaData({messages: entities.messages, signals: entities.signals, strategies: strategies})
      )
    })
  )),

)


             // .catch((e, source) => {
             //   return Observable.of(getError(), source)
             //
             // })
export default epics;
