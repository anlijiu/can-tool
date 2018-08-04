// @flow
let mod
if (process.env.NODE_ENV === 'production') {
  mod = require('./configureStore.prod'); // eslint-disable-line global-require
} else {
  mod = require('./configureStore.dev'); // eslint-disable-line global-require
}

const { configureStore, history } = mod.default

console.log("configureStore is ", configureStore, ", history is ", history)

export default { configureStore, history }
