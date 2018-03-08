
import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';


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
