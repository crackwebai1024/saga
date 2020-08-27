import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { actions as globalActions } from 'redux/global';

import AmplitudeService from 'services/amplitude';

import Select from './Select';
import StatusBlock from './StatusBlock';
import * as S from './styled';

class Filters extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      setSelectedPeriod: PropTypes.func.isRequired,
      setSelectedCountry: PropTypes.func.isRequired,
      setSelectedProject: PropTypes.func.isRequired,
      setSelectedSection: PropTypes.func.isRequired,
      setSelectedStatuses: PropTypes.func.isRequired,
    }).isRequired,
    periods: PropTypes.arrayOf(PropTypes.number).isRequired,
    countries: PropTypes.arrayOf(PropTypes.object).isRequired,
    projects: PropTypes.arrayOf(PropTypes.object).isRequired,
    sections: PropTypes.arrayOf(PropTypes.string).isRequired,
    statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    selectedCountry: PropTypes.number.isRequired,
    selectedProject: PropTypes.number.isRequired,
    selectedSection: PropTypes.number.isRequired,
    selectedStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    t: PropTypes.func.isRequired,
  }

  handlePeriodChange = (value) => {
    this.props.actions.setSelectedPeriod(value);
    AmplitudeService.logEvent('Global Dashboard: Reporting period has been changed', {
      year: value,
    });
  }

  handleCountryChange = (value) => {
    this.props.actions.setSelectedCountry(value);
    AmplitudeService.logEvent('Global Dashboard: Country has been changed', {
      country: value,
    });
  }

  handleProjectChange = (value) => {
    this.props.actions.setSelectedProject(value);
    AmplitudeService.logEvent('Global Dashboard: Project has been changed', {
      project: value,
    });
  }

  handleSectionChange = (value) => {
    this.props.actions.setSelectedSection(value);
    AmplitudeService.logEvent('Global Dashboard: Section has been changed', {
      section: value,
    });
  }

  handleStatusChange = (value) => {
    this.props.actions.setSelectedStatuses(value);
    AmplitudeService.logEvent('Global Dashboard: Status has been changed', {
      status: value,
    });
  }

  render() {
    const {
      periods,
      countries,
      projects,
      sections,
      statuses,
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
      t,
    } = this.props;

    return (
      <S.Wrapper>
        <S.SelectWrapper>
          <Select
            title={t('global.country')}
            name="country"
            items={countries}
            selected={selectedCountry}
            onChange={this.handleCountryChange}
            itemValue="id"
            itemName="name"
            defaultItem={{ name: 'All countries', id: -1 }}
          />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <Select
            title={t('global.reporting_period')}
            name="period"
            items={periods}
            selected={selectedPeriod}
            onChange={this.handlePeriodChange}
          />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <Select
            title={t('global.project')}
            name="project"
            items={projects}
            selected={selectedProject}
            onChange={this.handleProjectChange}
            itemValue="projectId"
            itemName="name"
            defaultItem={{ name: 'All', projectId: -1 }}
            disabled={selectedCountry === -1}
          />
        </S.SelectWrapper>
        <S.SelectWrapper>
          <Select
            title={t('global.section')}
            name="section"
            items={sections}
            selected={selectedSection}
            onChange={this.handleSectionChange}
            itemValue="sectionId"
            itemName="title"
            defaultItem={{ title: 'All', sectionId: -1 }}
            disabled={selectedProject === -1}
          />
        </S.SelectWrapper>
        <S.Status>
          <StatusBlock
            title={t('common.status')}
            onChange={this.handleStatusChange}
            items={statuses}
            selected={selectedStatuses}
          />
        </S.Status>
      </S.Wrapper>
    );
  }
}

const mapStateToProps = ({
  global: {
    periods,
    countries,
    projects,
    sections,
    statuses,
    selectedPeriod,
    selectedCountry,
    selectedProject,
    selectedSection,
    selectedStatuses,
  },
}) => ({
  periods,
  countries,
  projects,
  sections,
  statuses,
  selectedPeriod,
  selectedCountry,
  selectedProject,
  selectedSection,
  selectedStatuses,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...globalActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(Filters);
