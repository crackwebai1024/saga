import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';

import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import { getMonthYearFormatDate, getFormatedDateTime } from 'helpers/formatDate';
import { getGoogleMapLink } from 'helpers/getMapLink';
import { updateLinkToLogPage } from 'helpers/navigation';
import Legend from 'components/Legend';
import Map from './EnhancedMap';
// import Toggle from './Toggle';
import * as S from './styled';

class HocMap extends Component {
  componentDidMount() {
    if (this.props.page === 'map') {
      const mapContainer = window.document.getElementById('map');
      const rect = mapContainer.getBoundingClientRect();
      window.scrollTo(rect.x, rect.y - 31);
    }
  }

  render() {
    const {
      indicatorId, selectedProject, lastUpdated, t, mapData,
    } = this.props;

    return (
      <S.Wrapper id="map">
        <S.SectionTitle>
          {selectedProject.name} <span>{`(${getMonthYearFormatDate(selectedProject.updatedAt)})`}</span>
        </S.SectionTitle>
        <S.Legend>
          <Legend values={mapData.statusMilestones} isPositive={mapData.isPositiveProgress} />
          <S.LastUpdateNote>
            {`${t('country.updated_at')}  `}
            <S.UpdateLogLink to={(location) => updateLinkToLogPage(`${location.pathname}`)}>
              {
                lastUpdated ? `${getFormatedDateTime(lastUpdated.time)}`
                  : `${getFormatedDateTime(selectedProject.updatedAt)}`
              }
            </S.UpdateLogLink>
            {` by ${lastUpdated && lastUpdated.name}`}
          </S.LastUpdateNote>
        </S.Legend>
        {/* <Toggle indicatorId={indicatorId} /> */}
        <S.MapContainer>
          <Map
            googleMapURL={getGoogleMapLink()}
            loadingElement={<S.Loading />}
            containerElement={<S.Container />}
            mapElement={<S.MapElement />}
            indicatorId={indicatorId}
          />
        </S.MapContainer>
        {/* <S.SourceNote>
          {`${t('country.source')}: `}
        </S.SourceNote> */}
      </S.Wrapper>
    );
  }
}

HocMap.propTypes = {
  indicatorId: PropTypes.string.isRequired,
  lastUpdated: PropTypes.object,
  // country: PropTypes.object.isRequired,
  selectedProject: PropTypes.object.isRequired,
  mapData: PropTypes.object.isRequired,
  page: PropTypes.string,
  t: PropTypes.func.isRequired,
};

HocMap.defaultProps = {
  lastUpdated: undefined,
  page: undefined,
};

const mapStateToProps = ({
  indicatorDetails: {
    mapData,
  },
  country: {
    country,
    selectedProject,
  },
}) => ({
  mapData,
  lastUpdated: mapData.lastUpdated,
  country,
  selectedProject,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HocMap));
