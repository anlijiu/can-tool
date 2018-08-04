import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

import selectors from './selectors'
import actions from './actions'
import Typography from '@material-ui/core/Typography';
import { injectIntl } from "react-intl"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Notifications from 'react-notification-system-redux';
import { success, error } from 'react-notification-system-redux';
import s from './root.css'


const { ipcRenderer } = require('electron')

const mapStateToProps = (state, ownProps) => {
  return {
    strategy: selectors.strategyByName(state, ownProps),
    strategyValue: selectors.strategyValueByName(state, ownProps),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    init: bindActionCreators(actions.init, dispatch),
    add: bindActionCreators(actions.add, dispatch),
    minus: bindActionCreators(actions.minus, dispatch),
    setValue: bindActionCreators(actions.setValue, dispatch),
    changeType: bindActionCreators(actions.changeType, dispatch),
    warning: notificationOpts => dispatch(error(notificationOpts))
  }
}

@connect(mapStateToProps, mapDispatchToProps)
@withRouter
@injectIntl
export default class Root extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
  }

  handleChange = name => event => {
    console.log(" value is     ", Number(event.target.value))

    this.props.setValue({
      key: name,
      value: Number(event.target.value)
    })
  }

  handleAdd = () => {
    if (this.props.strategyValue + 1 > this.props.strategy.max) {
      const {
        intl: {
          formatMessage
        },
        warning,
        strategy: {
          max,
          min
        }
      } = this.props
      warning({
        // uid: 'once-please', // you can specify your own uid if required
        title: formatMessage({id: "error"}),
        message: formatMessage({id: "out_of_range_min_max"}, {min: min, max: max }),
        position: "tr",
        autoDismiss: 2
      })
    } else {
      this.props.add(this.props.name)
      ipcRenderer.send('action:set:strategy', [this.props.name, {...this.props.strategy, value: this.props.strategyValue + 1}])
    }
  }

  handleMinus = () => {
    if(this.props.strategyValue-1 < this.props.strategy.min) {
      const {
        intl: {
          formatMessage
        },
        warning,
        strategy: {
          max,
          min
        }
      } = this.props
      warning({
        // uid: 'once-please', // you can specify your own uid if required
        title: formatMessage({id: "error"}),
        message: formatMessage({id: "out_of_range_min_max"}, {min: min, max: max }),
        position: "tr",
        autoDismiss: 2
      })
    } else {
      this.props.minus(this.props.name)
      ipcRenderer.send('action:set:strategy', [this.props.name, {...this.props.strategy, value: this.props.strategyValue - 1}])
    }
  }

  renderConstStrategy() {
    const {
      add,
      minus,
      strategyValue,
      name,
    } = this.props

    let w = 0;
    let c = strategyValue+1
    do{
      c = c/10;
      w++
    }
    while(c > 1)
    return (
      <div className={s.container}>

        <IconButton
          aria-label="add"
          className={s.icon}
          onClick={this.handleAdd}>
          <AddIcon/>
        </IconButton>

        <Input
          value={strategyValue}
          className={s.input}
          style={{width: w*8.5+5}}
          onChange={this.handleChange(name)}
          inputProps={{
            'aria-label': 'Description',
          }}
        />

        <IconButton
          aria-label="minus"
          className={s.icon}
          onClick={this.handleMinus}>
          <RemoveIcon/>
        </IconButton>

      </div>

    );
  }

  render() {
    const {
      strategy,
    } = this.props

    if(strategy.type === 'const') {
      return this.renderConstStrategy()
    }
  }
}
