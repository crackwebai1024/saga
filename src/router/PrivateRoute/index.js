import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated) {
        return <Component {...props} />;
      }

      return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
  ]).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object,
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;
