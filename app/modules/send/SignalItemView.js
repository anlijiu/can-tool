import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { isUndefined, isNull, isEmpty } from 'lodash';
import Popover from 'react-popover';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Tooltip from '@material-ui/core/Tooltip';
import classNames from 'classnames/bind';
import { Root as Strategy } from "strategy";

import s from './SignalItemView.css'
const cx = classNames.bind(s);


export default class Root extends PureComponent {
  state = {
    isOpen: false,
  }
  toggle(toState = null) {
    console.log("SignalItemView  toggle in");
    this.setState({ isOpen: toState === null ? !this.state.isOpen : toState })
  }
  onClickItem = (event) => {
    console.log("SignalItemView  onClickItem in");
  }

  getItemEnums = () => {
    const {
      item,
    } = this.props

    if(item.enums) return (
      <div>
        enums:
        {Object.keys(item.enums).map(function(key, i){
          return (<div style={{paddingLeft: '15px'}}>{key}: {item.enums[key]} </div>);
        })}
      </div>);
  }

  render() {
    const {
      item,
    } = this.props

    console.log("SignalItemView render")

    if(!item) return (<div></div>)
    return (
      <Popover
        isOpen={this.state.isOpen}
        body={<div>
          <div>startbit: {item.start_bit}</div>
          <div>length: {item.length}</div>
          <div>offset: {item.offset}</div>
          <div>scaling: {item.scaling}</div>
          <div>maximum: {item.maximum}</div>
          <div>minimum: {item.minimum}</div>

          {this.getItemEnums()}
        </div>}
        children={
          <div className={s.container}
            key={item.name}
            onMouseOver={() => this.toggle(true)}
            onMouseOut={() => this.toggle(false)}
            onClick={this.onClickItem} >
            <div className={s.current}>
              {item.name} {item.comment}
            </div>
            <div className={s.control}>
              <Strategy
                name={item.name}/>
            </div>
          </div>
        }
      />
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
