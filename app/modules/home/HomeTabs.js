import React from 'react'
import RoutedTabs from '../../components/tabs/RoutedTabs'
import Tab from '@material-ui/core/Tab'
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router'
import { injectIntl } from "react-intl"

@withRouter
@injectIntl
class HomeTabs extends React.Component {

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
      <RoutedTabs
        selectors={[
        {tab: 0, path: '/signals/send', exact: true}, // Matches /one/123 exactly
        {tab: 1, path: '/signals/receive', exact: true}, // Matches /one/123/child exactly
        // {tab: 2, path: '/two'}, // Matches /two/...
      ]}>
        <Tab label={sendStr}  value={0} onClick={event => history.replace("/signals/send")} >
        </Tab>
        <Tab label={receiveStr}  value={1} onClick={event => history.replace("/signals/receive")} >
        </Tab>
      </RoutedTabs>
    );
  };
}

export default HomeTabs
