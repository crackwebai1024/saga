import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { checkAccessToCountry } from 'redux/countries/selectors';
import { actions as countryActions } from 'redux/country';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import { actions as importActions } from 'redux/importIndicatorData';

import AmplitudeService from 'services/amplitude';
import ImportIndicatorStatusDataModal from 'modules/Country/Modal/ImportIndicatorStatus';
import ImportIndicatorsGroupDataModal from 'modules/Country/Modal/ImportIndicatorsGroupData';
import ImportIndicatorDataModal from 'modules/Country/Modal/ImportIndicatorData';
import IndicatorNotesDataModal from 'modules/Country/Modal/IndicatorNotesData';
import Legend from 'components/Legend';
import Header from './Header';
import Section from './Section';
import Select from './Select';

import * as S from './styled';

class Dashboard extends Component {
  state = {
    showMap: false,
  };

  componentDidMount() {
    const {
      match,
      actions,
      selectedPeriod,
      country,
    } = this.props;

    if (!country || (country.slug !== match.params.country)) {
      actions.fetchCountryRequest({
        slug: match.params.country,
        selector: selectedPeriod,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      actions,
      selectedPeriod,
    } = this.props;
    const {
      match: prevMatch,
      selectedPeriod: prevSelectedPeriod,
    } = prevProps;

    if (match.params.country !== prevMatch.params.country) {
      actions.fetchCountryRequest({
        slug: match.params.country,
        selector: selectedPeriod,
      });
    }

    if (prevSelectedPeriod.period !== selectedPeriod.period
      || prevSelectedPeriod.value.toString() !== selectedPeriod.value.toString()) {
      actions.fetchProjectDashboardRequest();
    }
  }

  componentWillUnmount() {
    this.props.actions.closeImportModalState();
  }

  handlePeriodChange = (value) => {
    const {
      actions,
      country,
    } = this.props;

    actions.setIndicatorDetailsReportingSelector(value);
    AmplitudeService.logEvent('Reporting period has been changed', {
      countryId: (country && country.id) || 'null',
      selector: value,
    });
  }

  handleShowHideMapModal = () => this.setState(({ showMap }) => ({ showMap: !showMap }));

  onProjectChange = (value) => {
    this.props.actions.onProjectChangeRequest(value);
  }

  render() {
    const {
      allowedCountries,
      details,
      projects,
      selectedProject,
      match,
      selectedPeriod,
      hasAccessToCountry,
    } = this.props;

    if (!allowedCountries.length) {
      return null;
    }

    if (!hasAccessToCountry) {
      return (
        <Redirect to={`/country/${allowedCountries[0].slug}/country-dashboard`} />
      );
    }

    if (!details) {
      return null;
    }

    return (
      <S.Root>
        <Header
          title={details.name}
          selector={selectedPeriod}
          onPeriodChange={this.handlePeriodChange}
        />
        <S.Legend>
          <Legend />
        </S.Legend>
        <S.Row>
          <Select
            title="Project"
            name="project"
            items={projects}
            selected={selectedProject}
            onChange={this.onProjectChange}
          />
        </S.Row>
        {selectedProject && details.sections.map((item) => (
          <Section
            title={item.title}
            items={item.indicatorGroups}
            country={match.params.country}
            sectionId={item.id}
            projectId={selectedProject.id}
            key={item.id}
          />
        ))}
        <ImportIndicatorsGroupDataModal />
        <ImportIndicatorStatusDataModal />
        <ImportIndicatorDataModal />
        <IndicatorNotesDataModal />
      </S.Root>
    );
  }
}

Dashboard.propTypes = {
  allowedCountries: PropTypes.array.isRequired,
  selectedPeriod: PropTypes.object.isRequired,
  selectedProject: PropTypes.object,
  projects: PropTypes.array.isRequired,
  country: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    fetchCountryRequest: PropTypes.func.isRequired,
    setIndicatorDetailsReportingSelector: PropTypes.func.isRequired,
    onProjectChangeRequest: PropTypes.func.isRequired,
    fetchProjectDashboardRequest: PropTypes.func.isRequired,
    closeImportModalState: PropTypes.func.isRequired,
  }).isRequired,
  details: PropTypes.shape({
    sections: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  hasAccessToCountry: PropTypes.bool.isRequired,
};

Dashboard.defaultProps = {
  details: null,
  selectedProject: null,
  country: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...countryActions,
      ...actionsIndicatorDetails,
      ...importActions,
    },
    dispatch,
  ),
});

const mapStateToProps = ({
  countries: {
    allowedList,
  },
  indicatorDetails: {
    selector,
  },
  country: {
    details,
    projects,
    country,
    selectedProject,
  },
  theme,
}, props) => ({
  allowedCountries: allowedList,
  projects,
  selectedProject,
  selectedPeriod: selector,
  details,
  theme,
  country,
  hasAccessToCountry: checkAccessToCountry(allowedList, props),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
