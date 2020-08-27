import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Notifier from 'components/Notifier';
import Loader from 'components/Loader';

import { actions as actionsAuth } from 'redux/auth';
import Auth from 'modules/Auth';
import AppRoute from './AppRouter';
import PrivateRoute from './PrivateRoute';

class AppRouter extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      isAuthenticatedRequest: PropTypes.func.isRequired,
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isAuthenticatedLoading: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const { actions } = this.props;

    actions.isAuthenticatedRequest();
  }

  render() {
    const { isAuthenticated, isAuthenticatedLoading } = this.props;

    if (isAuthenticatedLoading) {
      return <span>Loading...</span>;
    }

    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/login" component={Auth} />
            <Route exact path="/forgot-password" component={Auth} />
            <Route exact path="/password/:action" component={Auth} />
            <Route exact path="/terms/:type" component={Auth} />
            <PrivateRoute
              path="/"
              component={() => <AppRoute />}
              isAuthenticated={isAuthenticated}
            />
          </Switch>
        </Router>
        <Notifier />
        <Loader />
      </>
    );
  }
}

const mapStateToProps = ({
  auth: {
    isAuthenticated,
    isAuthenticatedLoading,
  },
}) => ({
  isAuthenticated,
  isAuthenticatedLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsAuth,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
