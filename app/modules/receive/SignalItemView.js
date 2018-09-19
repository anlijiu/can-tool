import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isUndefined, isNull, isEmpty } from 'lodash';
import { injectIntl } from "react-intl"
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Popover from 'react-popover';
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
  state = {
    isOpen: false,
  }
  toggle(toState = null) {
    this.setState({ isOpen: toState === null ? !this.state.isOpen : toState })
  }
  onClickItem = (event) => {
  }

  render() {
    const {
      signal,
    } = this.props

    if(!signal) return (<div></div>)

    const { name, comment, value, start_bit, length, offset, scaling, maximum, minimum } = signal

    return (
      <Popover
        isOpen={this.state.isOpen}
        body={<div>
          <div>startbit: {start_bit}</div>
          <div>length: {length}</div>
          <div>offset: {offset}</div>
          <div>scaling: {scaling}</div>
          <div>maximum: {maximum}</div>
          <div>minimum: {minimum}</div>
        </div>}
        children={
        <div className={s.container}
          onMouseOver={() => this.toggle(true)}
          onMouseOut={() => this.toggle(false)}
          onClick={this.onClickItem} >
          <div className={s.current}>
            {name}   {comment}
          </div>
          <div className={s.control}>
            {value}
          </div>
        </div>
        }
      />
    )
  }
}
