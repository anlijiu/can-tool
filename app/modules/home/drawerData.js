
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';


export const menulist1 = (formatMessage, handleClick) => {
  return (
    <div>
      <ListItem
        button
        onClick={event => handleClick(event) }
        data-action="signal-config">
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={formatMessage({id: "signal"})} />
      </ListItem>
    </div>
  );
}


export default {
  menulist1
}
