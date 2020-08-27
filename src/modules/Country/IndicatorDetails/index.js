import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import { actions as countryActions } from 'redux/country';
import { Redirect } from 'react-router-dom';

import AmplitudeService from 'services/amplitude';
import Header from './Header';
import Content from './Content';
import * as S from './styled';

class IndicatorDetails extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        country: PropTypes.string.isRequired,
        sectionId: PropTypes.string.isRequired,
        groupId: PropTypes.string,
        indicatorId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    location: PropTypes.any.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
    // connect
    projectId: PropTypes.number,
    countryId: PropTypes.number,
    selectedPeriod: PropTypes.shape({
      period: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
      ]).isRequired,
    }).isRequired,
    error: PropTypes.string.isRequired,
    indicatorData: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      resetIndicatorData: PropTypes.func.isRequired,
      getIndicatorDataRequest: PropTypes.func.isRequired,
      fetchCountryRequest: PropTypes.func.isRequired,
    }).isRequired,
    countryIsLoading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    projectId: null,
    countryId: null,
  };

  state = {
    isPrint: false,
  };

  componentDidMount() {
    const {
      match: {
        params: {
          indicatorId,
          sectionId,
          country,
        },
      },
      countryId,
      projectId,
      actions,
      selectedPeriod,
      indicatorData,
      countryIsLoading,
    } = this.props;

    if (!countryIsLoading && (!countryId || !projectId)) {
      actions.fetchCountryRequest({
        slug: country,
        selector: selectedPeriod,
      });
    } else if (projectId && countryId) {
      actions.getIndicatorDataRequest({
        countryId,
        projectId,
        indicatorId,
        selectedPeriod,
      });
    }
    if (indicatorData && indicatorData.countryId) {
      AmplitudeService.logEvent('Page has been visited', {
        pageTitle: 'Details of Indicator',
        countryId: indicatorData.countryId,
        sectionId,
        indicatorId,
        indicatorTitle: indicatorData.title,
      });
    }
  }

  componentDidUpdate({ selectedPeriod: prevSelectedPeriod, projectId: prevProjectId }) {
    const {
      match: {
        params: {
          indicatorId,
          country,
        },
      },
      countryId,
      projectId,
      actions,
      selectedPeriod,
      countryIsLoading,
    } = this.props;

    if (!countryIsLoading && (!countryId || !projectId)) {
      actions.fetchCountryRequest({
        slug: country,
        selector: selectedPeriod,
      });
    } else if (
      (countryId && projectId)
      && (selectedPeriod.period !== prevSelectedPeriod.period || selectedPeriod.value !== prevSelectedPeriod.value
        || prevProjectId !== projectId)
    ) {
      actions.getIndicatorDataRequest({
        countryId,
        projectId,
        indicatorId,
        selectedPeriod,
      });
    }

    if (this.state.isPrint) {
      window.print();
      window.onafterprint = this.onPrint(false);
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.resetIndicatorData();
  }

  printDashboard = () => {
    this.setState({ isPrint: true });
  };

  onPrint = (bool) => {
    this.setState({ isPrint: bool });
  }

  render() {
    const {
      match: {
        params: {
          sectionId,
          groupId,
          country,
        },
      },
      indicatorData,
      countryId,
      projectId,
      error,
      location,
    } = this.props;
    const pathNameArray = location?.pathname?.split('/');
    const lastPathName = (pathNameArray && pathNameArray.length > 0) ? pathNameArray[pathNameArray.length - 1] : '';
    if (error) {
      return <Redirect to={`/country/${country}`} />;
    }

    return (
      <S.Wrapper>
        <Header
          printDashboard={this.printDashboard}
          country={country}
          sectionId={sectionId}
          groupId={groupId}
          isUpdateLog={lastPathName === 'update-log'}
        />
        {
          countryId && projectId
          && <Content indicatorData={indicatorData} />
        }
      </S.Wrapper>
    );
  }
}

const mapStateToProps = ({
  indicatorDetails: {
    selector,
    indicatorData,
    error,
  },
  country: {
    country,
    selectedProject,
    isLoading,
  },
}) => ({
  selectedPeriod: selector,
  countryId: country ? country.id : null,
  projectId: selectedProject ? selectedProject.id : null,
  countryIsLoading: isLoading,
  indicatorData,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
    ...countryActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorDetails);
