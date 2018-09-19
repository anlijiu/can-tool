// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { ConnectedRouter } from 'react-router-redux';
import { Route, Redirect } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { Home } from '../modules/home'
import { entitiesSelectors } from "entities";
import { sendSelectors } from "send"
import { strategySelectors } from "strategy";
import { nativeActions} from "../modules/nativelayer/index";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { injectIntl } from "react-intl"
import {syncMetaData} from "../modules/nativelayer/actions";

const { ipcRenderer } = require('electron')

type Props = {
  children: React.Node
};

const theme = createMuiTheme({
  palette: {
    type: 'light', // Switching the dark mode on is a single property value change.
  },
});


const mapStateToProps = (state, ownProps) => {
  return {
    selectedMsgIds: sendSelectors.selectedMessageIdsSelector(state),
    messages: entitiesSelectors.entitiesMessagesSelector(state),
    signals: entitiesSelectors.entitiesSignalssSelector(state),
    strategies: strategySelectors.strategySelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    syncMetaData: bindActionCreators(nativeActions.syncMetaData, dispatch),
    getWeapons: bindActionCreators(nativeActions.getWeapons, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@injectIntl
export default class App extends React.Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    console.log("   ", props)
    const { messages, signals, strategies, selectedMsgIds } = props
    console.log(selectedMsgIds)
    if(!!messages && messages.length > 0 && !!signals && signals.length > 0 && !!strategies) {
      this.props.syncMetaData({messages: messages, signals: signals, strategies: strategies})
      ipcRenderer.send('action:load:ammos', selectedMsgIds)
    }
    // ipcRenderer.sendSync('action:sync:meta',messages, signals, strategies)
  }


  render() {

    const {
      persistor,
      history,
      store,
      intl: {
        formatMessage
      },
    } = this.props

    global.__ = (id) => formatMessage({id: id})

    return (

        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Route path="/" component={Home}>
            </Route>
          </MuiThemeProvider>
        </ConnectedRouter>

    );
  }
}
