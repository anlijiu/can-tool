import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isUndefined, isNull, isEmpty } from 'lodash';
import { compose, pure, setDisplayName } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox';
import sendActions from "./actions";
import s from './MessageItemView.css'
import classNames from 'classnames/bind'
import { selectedMessageIdsSelector } from './selectors'

const { ipcRenderer }= require('electron')
const cx = classNames.bind(s);

export default class Root extends Component {

  render() {
    const {
      item,
    } = this.props
    const { name, id, raw } = item

    return (
      <div className={s.container} onClick={this.onClickItem} >
        <div className={s.current}>
          {name}
        </div>
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
//
// const MessageItemView = (props) => {
//   const {
//     item,
//   } = props
//
//   console.log(item)
//   return (
//       <div className={container} style={{minHeight: minHeight}}>
//           <div className={currentContainer} >
//
//             {item.name}
//           </div>
//       </div>
//   )
// }
//
//
// export default MessageItemView
