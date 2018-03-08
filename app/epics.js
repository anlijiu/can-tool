import { combineEpics } from 'redux-observable';
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
)(action$, store)
  .catch((error, stream) => {
    console.log(error)
    console.log(stream)
    return stream
  })


export default rootEpics
