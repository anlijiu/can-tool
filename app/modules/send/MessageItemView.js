import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isUndefined, isNull, isEmpty } from 'lodash';
import { compose, pure, setDisplayName } from 'recompose'
import Checkbox from '@material-ui/core/Checkbox';
import sendActions from "./actions";
import s from './MessageItemView.css'
import classNames from 'classnames/bind'
import { selectedMessageIdsSelector, messageSelected, focusedMessageSelector } from './selectors'

const { ipcRenderer }= require('electron')
const cx = classNames.bind(s);



const mapStateToProps = (state, ownProps) => {
  return {
    selectedMsgIds: selectedMessageIdsSelector(state),
    isMessageSelected: messageSelected(state, ownProps.item.id),
    focusedMessageItem: focusedMessageSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    focusOnMessage: bindActionCreators(sendActions.focusOnMessage, dispatch),
    selectMessage: bindActionCreators(sendActions.selectMessage, dispatch),
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Root extends Component {

  onClickItem = (event) => {
    const { focusOnMessage, item } = this.props
    focusOnMessage(item)
  }

  onClickCheckbox = (item, isChecked) => {
    const {
      selectedMsgIds,
      selectMessage
    } = this.props
    let id = Number(item.id)
    let index = selectedMsgIds.indexOf(id)
    selectMessage({
      id: id,
      index: index,
      isChecked: isChecked
    })

    ipcRenderer.send( isChecked ? 'action:add:ammo' : 'action:remove:ammo', id)
  }

  render() {
    const {
      item,
      selectedMsgIds,
      isMessageSelected,
      focusedMessageItem,
    } = this.props


    const containerClass = cx({
      container: true,
      focused: !!focusedMessageItem ? focusedMessageItem.id == item.id : false
    })

    console.log("MessageItemView  isMessageSelected ", isMessageSelected)

    return (
      <div className={containerClass} onClick={this.onClickItem} >
        <Checkbox
          checked={isMessageSelected}
          onClick={() => this.onClickCheckbox(item, !isMessageSelected) }/>
        <div className={s.current}>
          {item.name}
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
