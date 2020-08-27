import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as globalActions } from 'redux/global';
import { getGoogleMapLink } from 'helpers/getMapLink';

import Map from './EnhancedMap';
import * as S from './styled';

class HocMap extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getMapDataRequest: PropTypes.func.isRequired,
    }).isRequired,
    mapData: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object),
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
    onCountrySelected: PropTypes.func,
  }

  static defaultProps = {
    onCountrySelected: undefined,
  }

  componentDidMount() {
    this.fetchMapData();
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
      this.fetchMapData();
    }
  }

  fetchMapData = () => {
    const {
      actions,
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
    } = this.props;

    actions.getMapDataRequest({
      year: selectedPeriod,
      country: selectedCountry === -1 ? undefined : selectedCountry,
      project: selectedProject === -1 ? undefined : selectedProject,
      section: selectedSection === -1 ? undefined : selectedSection,
      statuses: selectedStatuses,
    });
  }

  render() {
    const { mapData, onCountrySelected } = this.props;

    return (
      <S.Wrapper>
        <Map
          googleMapURL={getGoogleMapLink()}
          loadingElement={<S.Loading />}
          containerElement={<S.Container />}
          mapElement={<S.MapElement />}
          mapData={mapData}
          onCountrySelected={onCountrySelected}
        />
      </S.Wrapper>
    );
  }
}

const mapStateToProps = ({
  global: {
    mapData,
    selectedPeriod,
    selectedCountry,
    selectedProject,
    selectedSection,
    selectedStatuses,
  },
}) => ({
  mapData,
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

export default connect(mapStateToProps, mapDispatchToProps)(HocMap);
