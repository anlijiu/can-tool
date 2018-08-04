import React from 'react';
import { Provider } from 'react-redux';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import moment from 'moment'
import App from './containers/App';
// import {configureStore, history} from './store/configureStore';
import _configureStore from './store/configureStore';
import './app.global.css';
import zh_CN from './locales/zh_CN';
import en from './locales/en';
const { app } = require('electron').remote
import {　IntlProvider, addLocaleData　} from 'react-intl';
import { PersistGate } from 'redux-persist/lib/integration/react'

import watch from 'redux-watch'
const {ipcRenderer} = require('electron')

// import Agent from 'node-can'
import './utils/rx'


const { configureStore, history } = _configureStore
const { store, persistor} = configureStore();

let w = watch(store.getState, 'signalsDefs.messages')
store.subscribe(w((newVal, oldVal, objectPath) => {
  console.log('%s changed from %s to %s', objectPath, oldVal, newVal)
  console.log(ipcRenderer.send('update-message-defs', newVal))
    // admin.name changed from JP to JOE
    }))

const locales = {
  en: en,
  zh: zh_CN
};

const getLocale　= () => {
  switch(app.getLocale().substr(0, 2)){
    case 'en':
      moment.locale("en");
      addLocaleData(require("react-intl/locale-data/en"));
      return "en"
      break;
    case 'zh':
      moment.locale("zh-CN");
      addLocaleData(require("react-intl/locale-data/zh"));
      return "zh-CN"
      break;
    default:
      return "en"
      break;
  }
}
const getMessage = () => {
  switch(app.getLocale().substr(0, 2)){
    case 'en':
      return locales.en
      break;
    case 'zh':
      return locales.zh
      break;
    default:
      return locales.en
      break;
  }
}

render(
  <AppContainer>
    <IntlProvider
      locale={getLocale()}
      messages={getMessage()}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor} store={store}>
            <App persistor={persistor} store={store} history={history}/>
        </PersistGate>
      </Provider>
    </IntlProvider>
  </AppContainer>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./modules/home', () => {
    const NextRoot = require('./modules/home').Home; // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history}/>
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
