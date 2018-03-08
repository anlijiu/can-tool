import { createSelector } from 'reselect'


import { entitiesSelectors } from 'entities'


export const strategySelector = state => state.strategy



const strategyByName = (state, props) => {
  return state.strategy[props.name]
}

const strategyValueByName = (state, props) =>
  state.strategy[props.name].value

export default {
  strategySelector,
  strategyValueByName,
  strategyByName
};

