import styled from 'styled-components';
import { Polygon as GoogleMapPolygon } from 'react-google-maps';

export const Polygon = styled(GoogleMapPolygon).attrs((props) => ({
  ...props,
  options: {
    ...props.options,
    fillColor: props.color || props.theme.colors.primaryDark,
    fillOpacity: 0.7,
    strokeColor: props.theme.colors.primaryWhite,
    strokeOpacity: 1,
    strokeWeight: props.isSelected ? 3 : 1,
  },
}))`
  && {
    cursor: default;
  }
`;

export const RegionValue = styled.div`
  color: #ffffff;
  position: relative;
  text-align: left;
  background: transparent;
  overflow: visible;
  padding-right: 1px;
  margin-left: -5px;
`;

export const StyledInfoBox = styled.div`
  && {}
`;
