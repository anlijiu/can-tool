import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { isUndefined, isNull, isEmpty } from 'lodash';
import AddIcon from 'material-ui-icons/Add';
import RemoveIcon from 'material-ui-icons/Remove';
import { Root as Strategy } from "strategy"

import s from './SignalItemView.css'
import classNames from 'classnames/bind'
const cx = classNames.bind(s);


export default class Root extends PureComponent {

  onClickItem = (event) => {
  }

  render() {
    const {
      item,
    } = this.props

    console.log("SignalItemView render")

    if(!item) return (<div></div>)
    return (
      <div className={s.container} onClick={this.onClickItem} >
        <div className={s.current}>
          {item.name}
        </div>
        <div className={s.control}>
          <Strategy
            name={item.name}/>
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
