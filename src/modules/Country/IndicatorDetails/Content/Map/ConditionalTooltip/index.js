import React from 'react';
import PropTypes from 'prop-types';
import {
  InfoWindow,
} from 'react-google-maps';

import Tooltip from '../Tooltip';

const ConditionalTooltip = ({
  columnNames,
  pin,
  regions,
  mapGroupingType,
  // allOpenedByDefault,
  ids,
  handleTooltipClose,
  position,
}) => {
  // if (ids.includes(pin.id) || allOpenedByDefault) {
  if (ids.includes(pin.id)) {
    return (
      <InfoWindow
        onCloseClick={() => handleTooltipClose(pin.id)}
        position={position}
        zIndex={99}
      >
        <Tooltip
          pin={pin}
          columnNames={columnNames}
          regions={regions}
          mapGroupingType={mapGroupingType === 'by_region'}
        />
      </InfoWindow>
    );
  }

  return null;
};

ConditionalTooltip.propTypes = {
  columnNames: PropTypes.array,
  pin: PropTypes.object.isRequired,
  regions: PropTypes.array,
  ids: PropTypes.array.isRequired,
  mapGroupingType: PropTypes.string.isRequired,
  // allOpenedByDefault: PropTypes.bool.isRequired,
  handleTooltipClose: PropTypes.func.isRequired,
  position: PropTypes.object.isRequired,
};

ConditionalTooltip.defaultProps = {
  columnNames: [],
  regions: [],
};

export default ConditionalTooltip;
