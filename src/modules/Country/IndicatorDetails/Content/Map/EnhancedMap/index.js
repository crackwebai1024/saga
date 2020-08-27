import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
} from 'react-google-maps';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import { getValidMapData } from 'redux/indicatorDetails/selectors';

import { geoJsonCoordToLatLng } from 'helpers/geoCoordinates';
import { STATUSES } from 'helpers/statuses';
import ConditionalTooltip from '../ConditionalTooltip';
import * as S from './styled';
import { styles } from '../config';

class Map extends Component {
  state = {
    ids: [],
    allOpenedByDefault: false,
  }

  hasMapValues = false;

  componentDidMount() {
    const {
      actions,
      indicatorId,
      selector,
      countryId,
      projectId,
    } = this.props;

    actions.getIndicatorDetailsMapRequest({
      countryId,
      projectId,
      id: indicatorId,
      selector,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      actions,
      indicatorId,
      selector,
      items,
      countryId,
      projectId,
      // mapGroupingType,
    } = this.props;
    const { selector: prevSelector } = prevProps;

    if (selector.period !== prevSelector.period || selector.value !== prevSelector.value) {
      actions.getIndicatorDetailsMapRequest({
        countryId,
        projectId,
        id: indicatorId,
        selector,
      });
    }

    if (items.length > 1) {
      this.fitBounds(items);
    }

    // if ((prevProps.mapGroupingType !== mapGroupingType) && mapGroupingType === 'by_region') {
    //   // eslint-disable-next-line react/no-did-update-set-state
    //   this.setState({
    //     allOpenedByDefault: true,
    //     ids: items.map((item) => item.id),
    //   });
    // }
  }

  fitBounds = (markers) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((pin) => {
      bounds.extend(new window.google.maps.LatLng(
        pin.lat,
        pin.lng,
      ));
    });
    this.googleMapRef.fitBounds(bounds);
  }

  handleTooltipClose = (id) => {
    this.setState((prevState) => ({
      ids: prevState.ids.filter((it) => it !== id),
      allOpenedByDefault: false,
    }));
  };

  handleTooltipOpen = (id) => {
    if (!this.state.ids.includes(id)) {
      this.setState((prevState) => ({
        ids: [...prevState.ids, id],
      }));
    } else {
      this.setState((prevState) => ({
        ids: prevState.ids.filter((it) => it !== id),
      }));
    }
  };

  setGoogleMapRef = (element) => {
    this.googleMapRef = element;
  }

  render() {
    const {
      items,
      regions,
      columnNames,
      mapGroupingType,
    } = this.props;

    const {
      allOpenedByDefault,
      ids,
    } = this.state;

    const options = {
      styles,
      streetViewControl: false,
      mapTypeId: window.google.maps.MapTypeId.HYBRID,
    };

    return (
      <GoogleMap
        zoom={items.length <= 1 ? 6 : undefined}
        center={items.length <= 1 ? {
          lat: (items[0] && items[0].lat) || 0,
          lng: (items[0] && items[0].lng) || 0,
        } : undefined}
        ref={this.setGoogleMapRef}
        options={options}
      >
        <>
          {items.map((pin) => {
            const region = regions.find((r) => r.name === pin.regionName);
            if (!region) {
              return null;
            }
            this.hasMapValues = true;
            return (
              <S.StyledInfoBox key={pin.id}>
                <InfoBox
                  key={pin.id}
                  defaultPosition={new window.google.maps.LatLng(pin.lat, pin.lng)}
                  options={{ closeBoxURL: '', enableEventPropagation: true }}
                >
                  <S.RegionValue>
                    { pin.value }
                  </S.RegionValue>
                </InfoBox>
                <ConditionalTooltip
                  columnNames={columnNames}
                  pin={pin}
                  ids={ids}
                  regions={regions}
                  mapGroupingType={mapGroupingType}
                  allOpenedByDefault={allOpenedByDefault}
                  handleTooltipClose={this.handleTooltipClose}
                  position={new window.google.maps.LatLng(pin.lat, pin.lng)}
                />
                <S.Polygon
                  key={region.name}
                  paths={geoJsonCoordToLatLng(region.geometry.coordinates)}
                  color={region.status ? STATUSES[region.status].color : null}
                  isSelected={ids.includes(pin.id)}
                  onClick={() => this.handleTooltipOpen(pin.id)}
                />
              </S.StyledInfoBox>
            );
          })}
          {
            !this.hasMapValues && regions.map((region) => (
              <S.Polygon
                key={region.name}
                paths={geoJsonCoordToLatLng(region.geometry.coordinates)}
                color={region.status ? STATUSES[region.status].color : null}
              />
            ))
          }
        </>
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  indicatorId: PropTypes.string.isRequired,
  countryId: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  mapGroupingType: PropTypes.string.isRequired,
  selector: PropTypes.object.isRequired,
  columnNames: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  regions: PropTypes.array,
  actions: PropTypes.shape({
    getIndicatorDetailsMapRequest: PropTypes.func.isRequired,
  }).isRequired,
};

Map.defaultProps = {
  regions: [],
};

const mapStateToProps = ({
  indicatorDetails: {
    mapData: {
      columnNames,
      items,
      regions,
      mapGroupingType,
    },
    selector,
  },
  country: {
    country,
    selectedProject,
  },
}) => ({
  selector,
  columnNames,
  items: getValidMapData(items),
  regions,
  mapGroupingType: mapGroupingType || 'by_region',
  countryId: country ? country.id : null,
  projectId: selectedProject ? selectedProject.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withScriptjs,
  withGoogleMap,
)(Map);
