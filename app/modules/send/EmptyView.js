import React from 'react'
import { compose } from 'recompose';
import s from './EmptyView.css'
import { injectIntl } from "react-intl"
import Icon from '@material-ui/core/Icon';
import ListAltSharp from '@material-ui/icons/ListAltSharp'
import Typography from '@material-ui/core/Typography';

export default class EmptyView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      emptyMessage,
      handleClick
    } = this.props

    return (
      <div className={s.container} onClick={handleClick}>
        <div className={s.content}>
          <ListAltSharp />
          <Typography type="title" color="default" noWrap>
            {emptyMessage}
          </Typography>
        </div>
      </div>
    )
  }
}
