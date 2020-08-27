import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch,
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

import Report from './Report';
import Milestones from './Milestones';
import UpdateLog from './UpdateLog';
import * as S from './styled';

const Content = ({ match, indicatorData }) => {
  if (!indicatorData.id) {
    return null;
  }

  return (
    <S.Wrapper>
      <Switch>
        <Route
          key="Report"
          path={`${match.path}/report/:page?`}
          component={Report}
        />
        <Route
          key="Milestones"
          path={`${match.path}/milestones`}
          component={Milestones}
        />
        <Route
          key="UpdateLog"
          path={`${match.path}/update-log`}
          component={UpdateLog}
        />
        <Redirect to={`${match.url}/report`} />
      </Switch>
    </S.Wrapper>
  );
};

Content.propTypes = {
  match: PropTypes.object.isRequired,
  indicatorData: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withTranslation(),
)(Content);
