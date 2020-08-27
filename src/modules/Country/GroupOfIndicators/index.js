import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { actions as countryActions } from 'redux/country';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';

import AmplitudeService from 'services/amplitude';
import { getIndicatorsAndName } from 'helpers/getIndicators';
import Header from '../Dashboard/Header';
import Section from './Section';
import Legend from '../../../components/Legend';

import selector from './selector';
import * as S from './styled';

class GroupOfIndicators extends Component {
  componentDidMount() {
    const {
      actions,
      details,
      match: {
        params: {
          country,
          sectionId,
          groupId,
        },
      },
    } = this.props;
    const sections = details.details && details.details.sections;

    if (details?.country?.id && details?.project?.id) {
      actions.fetchProjectDashboardRequest();
    }
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Details of Indicator Group',
      countrySlug: country,
      sectionId,
      groupId,
      groupTitle: sections ? getIndicatorsAndName(sections, sectionId, groupId)[0] : undefined,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      actions,
      selectedYear,
      details,
    } = this.props;
    const {
      selectedYear: prevSelectedYear,
    } = prevProps;
    if (details.country.id && details.project.id && selectedYear !== prevSelectedYear) {
      actions.fetchProjectDashboardRequest();
    }
  }

  handlePeriodChange = (value) => {
    const {
      actions,
      details,
    } = this.props;
    actions.setIndicatorDetailsReportingFilter({ country: value });
    AmplitudeService.logEvent('Reporting period has been changed', {
      countryId: (details && details.country.id) || 'null',
      year: value,
    });
  }

  render() {
    const {
      details,
      match,
      selectedYear,
    } = this.props;
    const indicatorsAndName = details.details
      ? getIndicatorsAndName(
        details.details.sections,
        match.params.sectionId,
        match.params.groupId,
      )
      : [];

    if (!details?.country?.id || !details?.project?.id) {
      return <Redirect to={`/country/${match.params.country}`} />;
    }

    return (
      <S.Root>
        <Header
          title={indicatorsAndName[0]}
          isGroup
          countrySlug={match.params.country}
          year={selectedYear}
          onPeriodChange={this.handlePeriodChange}
          hasBack
        />
        {indicatorsAndName[1] && (
          <Section
            items={indicatorsAndName[1]}
            country={match.params.country}
            sectionId={match.params.sectionId}
            groupId={match.params.groupId}
          />
        )}
        <S.Legend>
          <Legend />
        </S.Legend>
      </S.Root>
    );
  }
}

GroupOfIndicators.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string.isRequired,
      sectionId: PropTypes.string.isRequired,
      groupId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  selectedYear: PropTypes.number.isRequired,
  actions: PropTypes.shape({
    fetchProjectDashboardRequest: PropTypes.func.isRequired,
    setIndicatorDetailsReportingFilter: PropTypes.func.isRequired,
  }).isRequired,
  details: PropTypes.shape({
    details: PropTypes.shape({
      sections: PropTypes.array.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
    country: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...countryActions,
      ...actionsIndicatorDetails,
    },
    dispatch,
  ),
});

export default connect(
  selector,
  mapDispatchToProps,
)(GroupOfIndicators);
