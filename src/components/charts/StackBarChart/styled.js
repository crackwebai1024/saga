import styled from 'styled-components';
import { Box, Flex } from '@rebass/grid';

export const ChartContainer = styled(Flex).attrs(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: 1,
}))`
  overflow: hidden;
  height: 220px;
  transition: height 0.3s ease-in-out;
  z-index: 1;

  @media screen and (min-width: 480px) {
    height: 230px;
  }

  @media screen and (min-width: 640px) {
    height: 250px;
  }

  @media screen and (min-width: 768px) {
    height: 310px;
  }

  @media screen and (min-width: 1024px) {
    height: 340px;
  }

  @media screen and (min-width: 1200px) {
    height: 390px;
  }
`;

export const NoDataText = styled(Box)`

`;

export const Container = styled(Flex).attrs(() => ({
  flexDirection: 'column',
}))`

`;

const getBarLabelsFill = (index, colorScale) => colorScale[index % colorScale.length];

export const inlineStyles = {
  axisStyle: {
    axis: { stroke: '#4A4A4A' },
    ticks: { stroke: '#4A4A4A' },
    tickLabels: {
      fill: '#4A4A4A',
      textAnchor: 'middle',
      fontFamily: 'Axiforma, sans-serif',
      fontSize: 10,
      padding: 15,
    },
  },
  bar: (index, colorScale) => ({
    labels: {
      fill: getBarLabelsFill(index, colorScale),
      fontSize: 12,
    },
  }),
  chartPadding: {
    bottom: 30,
    left: 40,
    right: 40,
    top: 50,
  },
  flyout: {
    stroke: 'transparent', fill: 'rgba(0,0,0,0.9)',
  },
  targetLabel: {
    fontFamily: 'Axiforma, sans-serif',
    fontSize: 7,
    fontWeight: 'bold',
    textAnchor: 'start',
    textTransform: 'uppercase',
  },
  targetLine: {
    data: { stroke: '#000000', strokeWidth: 1 },
  },
  scatterStyle: (colors) => ({
    labels: { fontFamily: 'Axiforma, sans-serif', fill: colors.mainColor, fontSize: 7 },
    data: { fill: '#ffffff' },
  }),
};
