import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';

import GroupOfIndicators from '../GroupOfIndicators';
import IndicatorDetails from '../IndicatorDetails';
import Dashboard from '../Dashboard';
import ManageTargets from '../ManageTargets';
import EditIndicator from '../Dashboard/EditIndicator';

const Root = (props) => (
  <Redirect to={`/country/${props.match.params.country}/country-dashboard`} />
);

const CountryRoutes = () => (
  <Switch>
    <Route
      path="/country/:country/country-dashboard/section/:sectionId/group/:groupId/indicator/:indicatorId"
      component={IndicatorDetails}
    />
    <Route
      path="/country/:country/country-dashboard/section/:sectionId/indicator/:indicatorId"
      component={IndicatorDetails}
    />
    <Route
      path="/country/:country/country-dashboard/section/:sectionId/group/:groupId"
      component={GroupOfIndicators}
    />
    <Route
      path="/country/:country/country-dashboard/targets"
      render={({ match }) => <ManageTargets match={match} />}
    />
    <Route
      path="/country/:country/country-dashboard/section/:sectionId/editIndicator/:indicatorId"
      component={EditIndicator}
    />
    <Route
      exact
      path="/country/:country/country-dashboard"
      component={Dashboard}
    />
    <Route exact path="/country/:country?" component={Root} />
  </Switch>
);

Root.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default CountryRoutes;
