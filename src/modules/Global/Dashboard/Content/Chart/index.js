import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as globalActions } from 'redux/global';

import PieChart from 'components/charts/PieChart';
import { formatStatusData } from './formatters';
import * as S from './styled';

class Chart extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getStatusDataRequest: PropTypes.func.isRequired,
    }).isRequired,
    selectedPeriod: PropTypes.number.isRequired,
    selectedCountry: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    selectedProject: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    selectedSection: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    selectedStatuses: PropTypes.arrayOf(PropTypes.string).isRequired,
    statusData: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.fetchStatusData();
  }

  componentDidUpdate(prevProps) {
    const {
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
    } = this.props;

    const periodDidUpdate = prevProps.selectedPeriod !== selectedPeriod;
    const countryDidUpdate = prevProps.selectedCountry !== selectedCountry;
    const projectDidUpdate = prevProps.selectedProject !== selectedProject;
    const sectionDidUpdate = prevProps.selectedSection !== selectedSection;
    const statusDidUpdate = prevProps.selectedStatuses !== selectedStatuses;

    if (periodDidUpdate || countryDidUpdate || projectDidUpdate || sectionDidUpdate || statusDidUpdate) {
      this.fetchStatusData();
    }
  }

  fetchStatusData = () => {
    const {
      actions,
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
    } = this.props;

    actions.getStatusDataRequest({
      year: selectedPeriod,
      country: selectedCountry === -1 ? undefined : selectedCountry,
      project: selectedProject === -1 ? undefined : selectedProject,
      section: selectedSection === -1 ? undefined : selectedSection,
      statuses: selectedStatuses,
    });
  }

  render() {
    const { statusData } = this.props;
    const formattedStatusData = formatStatusData(statusData);

    return (
      <S.Container>
        <S.ChartContainer>
          <PieChart
            isMobileView={false}
            data={formattedStatusData.items}
          />
        </S.ChartContainer>
      </S.Container>
    );
  }
}

const mapStateToProps = ({
  global: {
    statusData,
    selectedPeriod,
    selectedCountry,
    selectedProject,
    selectedSection,
    selectedStatuses,
  },
}) => ({
  statusData,
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
