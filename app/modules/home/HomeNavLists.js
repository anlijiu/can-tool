import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router'
import { injectIntl } from "react-intl"
import RoutedLists from '../../components/list/RoutedLists'

@withRouter
@injectIntl
class HomeNavLists extends React.Component {

  render() {
    const {
      intl: {
        formatMessage
      },
      history,
    } = this.props
    const sendStr = formatMessage({id: "send"})
    const receiveStr = formatMessage({id: "receive"})

    return (
      <RoutedLists
        selectors={[
        {nav: 0, path: '/signals', exact: true},
        {nav: 1, path: '/device', exact: true},
        {nav: 2, path: '/about', exact: true},
        // {tab: 2, path: '/two'}, // Matches /two/...
      ]}>
        <MenuItem
          button
          value={0}
          onClick={event => history.replace("/signals")} >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={formatMessage({id: "signal"})} />
        </MenuItem>
        <MenuItem
          button
          value={1}
          onClick={event => history.replace("/device")} >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary={formatMessage({id: "device"})} />
        </MenuItem>
        <MenuItem
          button
          value={2}
          onClick={event => history.replace("/about")} >
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={formatMessage({id: "about"})} />
        </MenuItem>
      </RoutedLists>
    );
  };
}

export default HomeNavLists
