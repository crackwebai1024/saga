import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import AmplitudeService from 'services/amplitude';

import { actions as globalActions } from 'redux/global';

import MapChart from './Map';
import List from './List';
import Chart from './Chart';
import * as S from './styled';

class Content extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getGlobalCountriesRequest: PropTypes.func.isRequired,
      getGlobalProjectsRequest: PropTypes.func.isRequired,
      getGlobalSectionsRequest: PropTypes.func.isRequired,
      setSelectedCountry: PropTypes.func.isRequired,
      setGlobalTheme: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    selectedCountry: PropTypes.number.isRequired,
    selectedProject: PropTypes.number.isRequired,
    isPrint: PropTypes.bool.isRequired,
    onPrint: PropTypes.func.isRequired,
    statistic: PropTypes.object.isRequired,
    selectedCountryData: PropTypes.object,
    selectedProjectData: PropTypes.object,
  }

  static defaultProps = {
    selectedCountryData: undefined,
    selectedProjectData: undefined,
  }

  componentDidMount() {
    const { actions, selectedCountry, selectedProject } = this.props;

    actions.setGlobalTheme();
    actions.getGlobalCountriesRequest();
    actions.getGlobalProjectsRequest(selectedCountry);
    actions.getGlobalSectionsRequest(selectedProject);
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Global Dashboard' });
  }

  componentDidUpdate(prevProps) {
    const { actions, selectedCountry, selectedProject } = this.props;

    if (prevProps.selectedCountry !== selectedCountry) {
      actions.getGlobalProjectsRequest(selectedCountry);
    }
    if (prevProps.selectedProject !== selectedProject) {
      actions.getGlobalSectionsRequest(selectedProject);
    }
  }

  onCountrySelect = (id) => {
    const value = id || -1;
    this.props.actions.setSelectedCountry(value);
    AmplitudeService.logEvent('Global Dashboard: Country has been changed', {
      country: value,
    });
  };

  render() {
    const {
      t, isPrint, onPrint, statistic, selectedCountry, selectedCountryData, selectedProject, selectedProjectData,
    } = this.props;

    return (
      <S.Wrapper>
        <S.ContentRow>
          <S.ContentItem flex={1}>
            <S.ContentHeader>
              { selectedCountry === -1
                ? (
                  <S.ContentItemText>
                    {t('common.all_countries')}
                  </S.ContentItemText>
                )
                : (
                  <S.ContentItemLink
                    href={`/country/${selectedCountryData ? selectedCountryData.slug : ''}/country-dashboard`}
                  >
                    { (selectedCountryData && selectedCountryData.name) }
                  </S.ContentItemLink>
                )}
              <S.ViewCountryButton
                to={`/country/${selectedCountryData ? selectedCountryData.slug : ''}/country-dashboard`}
                disabled={selectedCountry === -1}
              >
                {`${t('global.view_country_dashboard')}`}
              </S.ViewCountryButton>
            </S.ContentHeader>
            <S.ChartContainer>
              <S.ChartIndicatorHeader>
                <S.ChartIndicatorText>
                  {`${t('global.indicator_status')}: ${selectedProject === -1 ? t('global.all_projects')
                    : (selectedProjectData && selectedProjectData.name)}`}
                </S.ChartIndicatorText>
              </S.ChartIndicatorHeader>
              <S.ChartRow>
                <S.Chart>
                  <Chart />
                </S.Chart>
                <S.ChartRightContent>
                  <S.ChartRightLabel>
                    {t('common.indicators')}
                  </S.ChartRightLabel>
                  <S.ChartRightNumber>
                    { (selectedCountry === -1) ? statistic.indicators
                      : (selectedCountryData && selectedCountryData.indicatorsCount) }
                  </S.ChartRightNumber>
                  <S.ChartRightLabel>
                    {t('common.sections')}
                  </S.ChartRightLabel>
                  <S.ChartRightNumber>
                    { (selectedCountry === -1) ? statistic.sections
                      : (selectedCountryData && selectedCountryData.sectionsCount) }
                  </S.ChartRightNumber>
                </S.ChartRightContent>
              </S.ChartRow>
            </S.ChartContainer>
          </S.ContentItem>
          <S.ContentItem flex={1}>
            <MapChart onCountrySelected={this.onCountrySelect} />
          </S.ContentItem>
        </S.ContentRow>
        <S.TabContent>
          <List isPrint={isPrint} onPrint={onPrint} />
        </S.TabContent>
      </S.Wrapper>
    );
  }
}

const mapStateToProps = ({
  global: {
    statistic,
    selectedCountry,
    countries,
    projects,
    selectedProject,
  },
}) => ({
  statistic,
  selectedCountry,
  selectedCountryData: countries && countries.find((item) => item.id === selectedCountry),
  selectedProject,
  selectedProjectData: projects && projects.find((item) => item.projectId === selectedProject),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...globalActions,
  }, dispatch),
});

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(Content);
