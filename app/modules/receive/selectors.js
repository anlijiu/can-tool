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

const signalSelector = (state, id) => state.receive.signals[id];
const unknownSelector = (state, id) => state.receive.unknowns[id];

export default {
  unknownIdsSelector,
  signalIdsSelector,
  signalSelector,
  unknownSelector
};

