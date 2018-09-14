import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import Typography from '@material-ui/core/Typography';
import { injectIntl } from "react-intl"
import { success, error } from 'react-notification-system-redux';

import selectors from './selectors'
import actions from './actions'
import ListView from "components/ListView/ListView"
import MessageItemView from "./MessageItemView"
import SignalItemView from "./SignalItemView"
import UnknownMessageView from "./UnknownMessageView"
import EmptyView from './EmptyView';
import { Message, Signal }  from "./models";
import s from './root.css'

const { ipcRenderer } = require('electron')

const forMessage = (items, position) => items[position] instanceof Message

const forSignal = (items, position) => items[position] instanceof Signal


const mapStateToProps = (state, ownProps) => {
  return {
    unknownIds: selectors.unknownIdsSelector(state),
    signalIds: selectors.signalIdsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startReceiveLoop: bindActionCreators(actions.startReceiveLoop, dispatch),
    stopReceiveLoop: bindActionCreators(actions.stopReceiveLoop, dispatch),
    receivedMessages: bindActionCreators(actions.acquireReceivedMessages, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@injectIntl
export default class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [{ title: 'Chicken', children: [ { title: 'Egg' } ] }],
    };
    this.props.startReceiveLoop();
  }

  handleReceivedMessage = (event, arg) => {
    if(arg.messages.length == 0 && arg.unknowns.length == 0) return;
    this.props.receivedMessages(arg);
  }

  componentWillMount() {
    ipcRenderer.on('replay:acquire:received', this.handleReceivedMessage);
    ipcRenderer.send('action:acquire:received');

  }

  componentWillUnmount() {
    ipcRenderer.removeListener('replay:acquire:received', this.handleReceivedMessage);
    ipcRenderer.send('action:stop:received');
  }

  render() {
    const delegatesMap = new Map();
    delegatesMap.set(forMessage, MessageItemView)
    delegatesMap.set(forSignal, SignalItemView)

    const {
      signalIds,
      unknownIds,
      intl: {
        formatMessage
      },
    } = this.props

    return (
      <div className={s.wrapper}>
        <div className={s.titlecontainer}>
          <div className={s.title}>
            {formatMessage({id: "received_signals"})}
          </div>
          <div className={s.title}>
            {formatMessage({id: "unknown_messages"})}
          </div>
        </div>
        <div className={s.container}>
          { signalIds.length == 0 ?
              <EmptyView
                emptyMessage={formatMessage({id: "no_data"})}
              /> :
              <ListView
                list={signalIds}
                itemView={SignalItemView}
                windowScrollerEnabled={false}
                />
          }
          { unknownIds.length == 0 ?
              <EmptyView
                emptyMessage={formatMessage({id: "no_data"})}
              /> :
              <ListView
                list={unknownIds}
                itemView={UnknownMessageView}
                windowScrollerEnabled={false}
                />
          }
      </div>
    </div>
    );
  }
}
