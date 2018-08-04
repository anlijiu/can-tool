import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'


import Typography from '@material-ui/core/Typography';
import { injectIntl } from "react-intl"

import s from './root.css'

@connect()
@withRouter
@injectIntl
export default class Root extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
  }


  render() {
    const {
      history,
      match,
      location,
      activeTab,
      intl: {
        formatMessage
      },
      classes,
      theme
    } = this.props

    console.log("devices/root.js his.props:            -> ", this.props, history)

    return (
      <div className={s.container}>
            <Typography variant="title" color="inherit" noWrap>
              {formatMessage({id: "device"})}
            </Typography>
            <Typography variant="body1" color="inherit" noWrap>
              目前只支持 Canalystii
            </Typography>
      </div>

    );
  }
}
