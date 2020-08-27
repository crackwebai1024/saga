import styled from 'styled-components';
import { Box } from '@rebass/grid';

import { STATUSES } from 'helpers/statuses';

const getSectorColor = ({ datum }) => (datum.x === 'other'
  ? '#eeeeee'
  : STATUSES[datum.x].color
);

export const Container = styled.svg.attrs(({ modif }) => ({
  viewBox: (modif && '0 0 420 420') || '0 0 420 295',
  width: '100%',
}))`
  height: 100%;
`;

export const inlineStyles = {
  pieChartPadding: {
    bottom: 125,
    left: 0,
    right: 180,
    top: 0,
  },
  pieChartStyle: {
    data: { fill: getSectorColor, stroke: '#f7f7f7', strokeWidth: 1 },
  },
};

export const mobileInlineStyles = {
  ...inlineStyles,
  pieChartPadding: {
    ...inlineStyles.pieChartPadding,
    bottom: 150,
    left: 50,
  },
};

export const PieContainer = styled(Box).attrs({
  width: 1,
})`
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;
