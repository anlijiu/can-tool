import { createSelector } from 'reselect'


import { Message, Signal } from './models'


export const receivingSelector = state => state.receive.receiving
export const knownSelector = state => Object.values(state.receive.known)
export const unknownSelector = state => Object.entries(state.receive.unknown)

export const allEntriesSelector = createSelector(
  knownSelector ,
  unknownSelector,
  (knownList, unknownList) => flatten(knownList.map(e => [Object.assign(new Message, e)].concat(Object.entries(e.signals).map(([name, value]) => Object.assign(new Signal, {name: name, value: value})))).concat(unknownList))
)

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

export default {
  allEntriesSelector,
  receivingSelector,
  knownSelector,
  unknownSelector
};

