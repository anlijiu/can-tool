import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isUndefined, isNull, isEmpty } from 'lodash';
import { injectIntl } from "react-intl"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { Root as Strategy } from "strategy"
import classNames from 'classnames/bind'

import selectors from './selectors'
import s from './SignalItemView.css'
const cx = classNames.bind(s);

const mapStateToProps = (state, ownProps) => {
  return {
    signal: selectors.signalSelector(state, ownProps.item),
  }
}

@connect(mapStateToProps)
@injectIntl
export default class Root extends Component {

  onClickItem = (event) => {
  }

  render() {
    const {
      signal,
    } = this.props

    if(!signal) return (<div></div>)

    const { name, value} = signal

    return (
      <div className={s.container} onClick={this.onClickItem} >
        <div className={s.current}>
          {name}
        </div>
        <div className={s.control}>
          {value}
        </div>
      </div>
    )
  }
}
