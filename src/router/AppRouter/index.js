import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Admin from 'modules/Admin';
import Global from 'modules/Global';
import Country from 'modules/Country';

import { actions as countriesActions } from 'redux/countries';

import Main from 'modules/Main';

class AppRoute extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      getFormCountriesRequest: PropTypes.func.isRequired,
      getAllowedCountriesRequest: PropTypes.func.isRequired,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    countries: PropTypes.array.isRequired,
    hasAllCountriesAccess: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    const {
      actions,
    } = this.props;

    actions.getFormCountriesRequest();
    actions.getAllowedCountriesRequest();
  }

  getModulesByUser = () => {
    const {
      isAuthenticated,
      isAdmin,
      hasAllCountriesAccess,
    } = this.props;

    if (!isAuthenticated) {
      return [
        { module: Global, path: '/global' },
        { module: Admin, path: '/admin' },
        { module: Country, path: '/country' },
      ];
    }
    if (isAdmin && hasAllCountriesAccess) {
      return [
        { module: Global, path: '/global' },
        { module: Admin, path: '/admin' },
        { module: Country, path: '/country' },
      ];
    }
    if (isAdmin && !hasAllCountriesAccess) {
      return [
        { module: Admin, path: '/admin' },
        { module: Country, path: '/country' },
      ];
    }
    if (hasAllCountriesAccess) {
      return [
        { module: Global, path: '/global' },
        { module: Country, path: '/country' },
      ];
    }

    return [
      { module: Country, path: '/country' },
    ];
  }

  render() {
    const {
      countries,
    } = this.props;

    if (!countries.length) {
      return null;
    }

    return (
      <Switch>
        <Route render={() => <Main modules={this.getModulesByUser()} />} />
      </Switch>
    );
  }
}

const mapStateToProps = ({
  auth: {
    isAdmin,
    isAuthenticated,
  },
  countries: {
    formList,
    hasAllCountriesAccess,
  },
}) => ({
  isAdmin,
  isAuthenticated,
  countries: formList,
  hasAllCountriesAccess,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...countriesActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);
