import React from 'react';
import PropTypes from 'prop-types';
import matchPath from 'react-router-dom/matchPath';
import { withRouter } from 'react-router'
import Tabs from 'material-ui/Tabs';

@withRouter
class RoutedTabs extends React.Component {
  render() {
    const {
      selectors,
      children,
      staticContext,
      ...others
    } = this.props;

    const location = this.props.location || this.context.router.route.location;
    const match = selectors.find(selector => !!matchPath(location.pathname, {...selector}));
    const selected = match === undefined ? false : match.tab;

    return (
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        centered
        value={selected} {...others}>
        {children}
      </Tabs>
    );
  }
}

RoutedTabs.propTypes = {
  selectors: PropTypes.arrayOf(PropTypes.shape({
    tab: PropTypes.any.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  location: PropTypes.object,
  children: PropTypes.node.isRequired,
};

RoutedTabs.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired,
  }),
};

export default RoutedTabs;
