import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, routerActions } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import makeRootReducer from '../reducers';
import {
  persistStore, autoRehydrate
} from 'redux-persist'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from '../epics'

const history = createHashHistory()

const configureStore = (initialState?: counterStateType) => {
  // Redux Configuration
  const enhancers = []

  const epicMiddleware = createEpicMiddleware();
  // Create a history of your choosing (we're using a browser history in this case)
  const middleware = [routerMiddleware(history), epicMiddleware]

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  // middleware.push(logger);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    })
    : compose;
  /* eslint-enable no-underscore-dangle */

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));

  const enhancer = composeEnhancers(...enhancers);

  // Create Store
  const rootReducer = makeRootReducer()

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers'))); // eslint-disable-line global-require
  }

  const persistor = persistStore(store);

  persistor.purge()

  epicMiddleware.run(rootEpic)

  return { persistor, store };
};

export default { configureStore, history };
