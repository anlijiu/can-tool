// @flow


import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ConnectedRouter } from 'react-router-redux';
import { Switch } from 'react-router-dom'
import { withRouter } from 'react-router'
import { injectIntl } from "react-intl"
import Typography from 'material-ui/Typography';
import { dbcSelectors } from "dbc"
import EmptyView from './EmptyView'
const {dialog} = require('electron').remote
import ListView from "../../components/ListView/ListView"
import MessageItemView from "./MessageItemView"
import SignalItemView from "./SignalItemView"
import sendActions from "./actions";
import { dbcActions } from 'dbc'
import { signalOfFocusedMessage } from './selectors'
import s from './root.css'


const mapStateToProps = (state, ownProps) => {
  return {
    messages: dbcSelectors.messagesSelector(state),
    signals: signalOfFocusedMessage(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadDbcFile: bindActionCreators(dbcActions.loadDbcFile, dispatch)
  }
}

@injectIntl
@connect(mapStateToProps, mapDispatchToProps)
export default class Root extends Component {
  static propTypes = {}

  state = { forceUpdate : false }
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    //you could setState here
  }

  handleClick = event => {
    const file = dialog.showOpenDialog(
      {
        properties: ['openFile',],
        filters: [
          { name: __("signal_defs_file"), extensions: [ 'json' ] },
          { name: __("all_files"), extensions: [ '*' ] }
        ],
      },  (file) => {
        console.log("handleOpenFile         files is  ", file)
        this.props.loadDbcFile(file)
      }
    );
  }

  render() {
    const {
      messages,
      signals,
      intl: {
        formatMessage
      },
    } = this.props

    let signalArray = Array.isArray(signals) ? signals : [].concat(signals)

    console.log("signalArray      " , signalArray)
    return messages.length == 0 ?
      (
        <EmptyView
          emptyMessage={formatMessage({id: "load_signals_defination_file"})}
          handleClick={this.handleClick} />
      ) : (
        <div className={s.container}>
          <ListView
            list={messages}
            itemView={MessageItemView}
            windowScrollerEnabled={false}
          />
          <div className={s.signals}>
            <ListView
              ref={(ref) => {
                this.signalList = ref
              }}
              list={signalArray}
              itemView={SignalItemView}
              windowScrollerEnabled={false}
            />
          </div>

        </div>
      )
  }
}

