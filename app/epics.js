import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators'
import { epics as send } from 'send'
import { dbcEpics } from 'dbc'
import { receiveEpics } from 'receive'
import { nativeEpics } from 'nativelayer'
import { replace } from 'react-router-redux';


const rootEpics = (action$, store) => combineEpics(
  send,
  receiveEpics,
  dbcEpics,
  nativeEpics
)(action$, store).pipe(
  catchError((err, caught) => {
    console.log(err)
    return caught
  }),
)


export default rootEpics
