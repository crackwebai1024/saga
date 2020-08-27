import styled from 'styled-components';
import { Polygon as GoogleMapPolygon } from 'react-google-maps';

import { STATUSES } from 'helpers/statuses';

export const Polygon = styled(GoogleMapPolygon).attrs(({ status, ...props }) => ({
  ...props,
  options: {
    ...props.options,
    fillColor: STATUSES[status].color,
    fillOpacity: 0.8,
    strokeColor: props.theme.colors.primaryWhite,
    strokeOpacity: 1,
    strokeWeight: props.isSelected ? 2.5 : 0.8,
  },
}))`
  && {
    cursor: default;
  }
`;

export const MarkerLabel = styled.div`
  padding: 5px 0;
  font-size: 1rem;
  color: #ffffff;
  text-shadow: -1px -1px 2px #27323e, 1px 1px 2px #27323e;
`;
