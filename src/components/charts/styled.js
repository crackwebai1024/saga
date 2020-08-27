import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';
import { STATUSES } from 'helpers/statuses';

const defaultAxisStyle = {
  axis: { stroke: 'transparent' },
  ticks: { stroke: 'transparent' },
  tickLabels: { fill: '#4A4A4A', fontFamily: 'Axiforma, sans-serif', fontSize: 9 },
};

export const strokeDasharray = '10, 5';

export const BarContainer = styled(Flex).attrs(() => ({
  alignItems: 'center',
  justifyContent: 'center',
}))`
  overflow: hidden;
  height: 250px;
  z-index: 1;
  transition: height 0.3s ease-in-out;

  @media screen and (min-width: 480px) {
    height: 360px;
  }

  @media screen and (min-width: 640px) {
    height: 420px;
  }

  @media screen and (min-width: 768px) {
    height: 480px;
  }

  @media screen and (min-width: 1024px) {
    height: 540px;
  }

  @media print {
    height: 510px;
  }
`;

export const NoDataText = styled(Box)`

`;

export const inlineStylesBase = {
  barChartStyle: {
    data: { fill: ({ datum }) => (STATUSES[datum.status]?.color || '#9DDAE0') },
    labels: { fill: '#27323e', fontFamily: 'Axiforma, sans-serif', fontSize: 7 },
  },
  chartPadding: {
    bottom: 60,
    left: 25,
    right: 10,
    top: 0,
  },
  horizontalAxisStyle: (itemsCount) => ({
    ...defaultAxisStyle,
    axis: { stroke: '#27323e', strokeWidth: 1 },
    tickLabels: {
      textAnchor: ((itemsCount < 6) ? 'middle' : 'start'),
      angle: ((itemsCount < 6) ? 0 : 30),
      fontFamily: 'Axiforma, sans-serif',
      fontSize: 7,
      padding: 5,
    },
    grid: {
      stroke: '#CFCFCF5C',
      strokeWidth: 1,
    },
  }),
  verticalAxisStyle: {
    ...defaultAxisStyle,
    tickLabels: {
      ...defaultAxisStyle.tickLabels,
      textAnchor: 'middle',
      fontFamily: 'Axiforma, sans-serif',
      fontSize: 7,
    },
    grid: {
      stroke: '#CFCFCF5C',
      strokeWidth: 1,
    },
  },
  targetLabel: {
    fontFamily: 'Axiforma, sans-serif',
    fontSize: 7,
    textAnchor: 'start',
    fill: '#DB6767',
  },
  flyout: {
    stroke: '#27323e', fill: 'white',
  },
  targetLine: {
    data: { stroke: '#DB6767', strokeWidth: 0.5, strokeDasharray },
  },
  scatterStyle: {
    labels: {
      fontFamily: 'Axiforma, sans-serif',
      fontSize: 7,
      textShadow: `
        rgb(255, 255, 255) -1px -1px 0px,
        rgb(255, 255, 255) -1px 1px 0px,
        rgb(255, 255, 255) 1px -1px 0px,
        rgb(255, 255, 255) 1px 1px 0px
      `,
    },
    data: { fill: 'transparent' },
  },
};
