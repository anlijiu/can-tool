import { createSelector } from 'reselect';

import { entries } from "../../utils/object";
import { Message, Signal } from './models';
import flatterArray from '../../utils/flattenArray';


const msgIds = state => state.receive.msgIds;
const messages = state => state.receive.messages;
const signals = state => state.receive.signals;
const unknowns = state => state.receive.unknowns;

const unknownIdsSelector = state => state.receive.unknownIds;

const signalIdsSelector = createSelector(
  messages,
  (msgs) => flatterArray(Object.values(msgs).map(msg => msg.signals))
)

const _signalSelector = (state, id) => state.receive.signals[id];
const _signalMetasSelector = (state, id) => state.entities.signals[id];
const signalSelector = createSelector(
  _signalSelector,
  _signalMetasSelector,
  (signal, signalMeta) => {
    if(signal && signalMeta) {
      signal.comment = signalMeta.comment;
      signal.start_bit = signalMeta.start_bit;
      signal.length = signalMeta.length;
      signal.offset = signalMeta.offset;
      signal.scaling = signalMeta.scaling;
      signal.maximum = signalMeta.maximum;
      signal.minimum = signalMeta.minimum;
    }
    return signal;
  }
);

const unknownSelector = (state, id) => state.receive.unknowns[id];

export default {
  unknownIdsSelector,
  signalIdsSelector,
  signalSelector,
  unknownSelector
};

