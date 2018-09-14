
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


export const menulist1 = (formatMessage, handleClick) => {
  return (
      <ListItem
        style={{paddingLeft: "1rem"}}
        button
        onClick={event => handleClick(event) }
        data-action="signal-config">
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary={formatMessage({id: "signal"})} />
      </ListItem>
  );
}


export default {
  menulist1
}
