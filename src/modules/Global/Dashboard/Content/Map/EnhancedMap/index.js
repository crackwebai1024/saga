import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { STATUSES } from 'helpers/statuses';
import { geoJsonCoordToLatLng } from 'helpers/geoCoordinates';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from 'react-google-maps';

import Tooltip from './Tooltip';
import * as S from './styled';
import { styles } from '../config';

class Map extends Component {
  state = {
    openedId: null,
  };

  componentDidUpdate() {
    const {
      mapData,
    } = this.props;

    if (mapData && mapData.items.length > 1) {
      this.fitBounds(mapData.items);
    }
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

  handleTooltipClose = () => {
    this.setState({
      openedId: null,
    }, () => this.props.onCountrySelected && this.props.onCountrySelected(null));
  };

  handleTooltipOpen = (id) => {
    this.setState({
      openedId: id,
    }, () => this.props.onCountrySelected && this.props.onCountrySelected(id));
  };

  getPixelPositionOffset = (width) => ({
    x: -(width / 2),
    y: 0,
  });

  setGoogleMapRef = (element) => {
    this.googleMapRef = element;
  }

  render() {
    const { mapData: { items } } = this.props;
    const { openedId } = this.state;

    const options = {
      controlSize: 28,
      minZoom: 1.5,
      styles,
      streetViewControl: false,
      mapTypeId: 'satellite',
    };

    return (
      <GoogleMap
        defaultZoom={1.5}
        defaultCenter={{ lat: 30, lng: 0 }}
        options={options}
        ref={this.setGoogleMapRef}
      >
        { items.map((pin) => (
          <Fragment key={pin.id}>
            {pin.countryPolygons ? (
              <S.Polygon
                paths={geoJsonCoordToLatLng(pin.countryPolygons)}
                onClick={() => this.handleTooltipOpen(pin.id)}
                isSelected={pin.id === openedId || items.length === 1}
                status={pin.status}
              />
            ) : (
              <Marker
                position={{
                  lat: pin.lat,
                  lng: pin.lng,
                }}
                onClick={() => this.handleTooltipOpen(pin.id)}
                icon={{
                  url: STATUSES[pin.status] && STATUSES[pin.status].pin,
                  scaledSize: { width: 28, height: 38 },
                }}
              />
            )}

            {
              (pin.id === openedId || items.length === 1) && (
                <InfoWindow
                  position={{
                    lat: pin.lat,
                    lng: pin.lng,
                  }}
                  onCloseClick={this.handleTooltipClose}
                >
                  <Tooltip pin={pin} />
                </InfoWindow>
              )
            }
          </Fragment>
        ))}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      country: PropTypes.string.isRequired,
      indicatorId: PropTypes.string.isRequired,
    }).isRequired,
  }),
  mapData: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  onCountrySelected: PropTypes.func,
};

Map.defaultProps = {
  match: null,
  onCountrySelected: undefined,
};

export default compose(
  withScriptjs,
  withGoogleMap,
)(Map);
