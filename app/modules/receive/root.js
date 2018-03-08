import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'
import SortableTree from 'react-sortable-tree';
import Typography from 'material-ui/Typography';
import { injectIntl } from "react-intl"
import { success, error } from 'react-notification-system-redux';

import selectors from './selectors'
import actions from './actions'
import ListView from "components/ListView/ListView"
import MessageItemView from "./MessageItemView"
import SignalItemView from "./SignalItemView"
import { Message, Signal }  from "./models";
import s from './root.css'

const { ipcRenderer } = require('electron')

const forMessage = (items, position) => items[position] instanceof Message

const forSignal = (items, position) => items[position] instanceof Signal




const mapStateToProps = (state, ownProps) => {
  console.log("state is    ", state)
  return {
    receiving: selectors.receivingSelector(state),
    known: selectors.knownSelector(state),
    unknown: selectors.unknownSelector(state),
    all: selectors.allEntriesSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    startReceiveLoop: bindActionCreators(actions.startReceiveLoop, dispatch),
    stopReceiveLoop: bindActionCreators(actions.stopReceiveLoop, dispatch),
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
    this.props.startReceiveLoop()
    console.log("module receive root constructor       ")
  }

  componentWillUnmount() {
    this.props.stopReceiveLoop()
  }

  render() {
    const delegatesMap = new Map();
    delegatesMap.set(forMessage, MessageItemView)
    delegatesMap.set(forSignal, SignalItemView)

    const { known, unknown, all } = this.props

    console.log("known is            ", known, "all is      ", all);
    if(all.length == 0) return (
      <div>empty</div>
    )
    console.log("ListView is     ", ListView, "        MessageItemView is   ", MessageItemView);
    return (
      <div className={s.container}>
        <ListView
          list={all}
          delegatesMap={delegatesMap}
          windowScrollerEnabled={false}
        />
      </div>
    );
  }
}
