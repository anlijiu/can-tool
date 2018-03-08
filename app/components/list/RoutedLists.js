import React from 'react';
import PropTypes from 'prop-types';
import matchPath from 'react-router-dom/matchPath';
import { withRouter } from 'react-router'
import { MenuList } from 'material-ui/Menu';

@withRouter
class RoutedLists extends React.Component {
  render() {
    const {
      selectors,
      children,
      staticContext,
      ...others
    } = this.props;

    const location = this.props.location || this.context.router.route.location;
    const match = selectors.find(selector => !!matchPath(location.pathname, {...selector}));
    const selected = match === undefined ? false : match.nav;

    const childrenWithProps = React.Children.map(children, child => {
      return React.cloneElement(child,
        {
          selected: selected == child.props.value,
        }
      )
    });

    return (
      <MenuList
        value={selected} {...others}>
        {childrenWithProps}
      </MenuList>
    );
  }
}

RoutedLists.propTypes = {
  selectors: PropTypes.arrayOf(PropTypes.shape({
    nav: PropTypes.any.isRequired,
    path: PropTypes.string.isRequired,
  })).isRequired,
  location: PropTypes.object,
  children: PropTypes.node.isRequired,
};

RoutedLists.contextTypes = {
  router: PropTypes.shape({
    route: PropTypes.object.isRequired,
  }),
};

export default RoutedLists;
