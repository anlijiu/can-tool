import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from "react-intl"
import { bindActionCreators } from 'redux'
import { isUndefined, isNull, isEmpty } from 'lodash';
import { compose, pure, setDisplayName } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox';
import sendActions from "./actions";
import s from './UnknownMessageView.css'
import classNames from 'classnames/bind'
import selectors from './selectors'

const cx = classNames.bind(s);

const mapStateToProps = (state, ownProps) => {
  return {
    unknown: selectors.unknownSelector(state, ownProps.item),
  }
}

@connect(mapStateToProps)
@injectIntl
export default class Root extends Component {

  render() {
    const {
      unknown,
    } = this.props
    const { id, raw } = unknown

    return (
      <div className={s.container} onClick={this.onClickItem} >
        <div className={s.current}>
          {id}
        </div>
        <div className={s.current}>
          {raw}
        </div>
      </div>
    )
  }
}
