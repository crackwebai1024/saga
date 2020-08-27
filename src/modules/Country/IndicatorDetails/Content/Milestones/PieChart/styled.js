import styled from 'styled-components';
import { Box } from '@rebass/grid';
import { Paper } from '@material-ui/core';

import { MILESTONES_STATUSES } from 'configs/statuses';

const getSectorColor = ({ datum }) => (datum.x === 'other'
  ? '#eeeeee'
  : MILESTONES_STATUSES[datum.x].color
);

export const Container = styled.svg.attrs(({ modif }) => ({
  height: '100%',
  viewBox: (modif && '0 0 450 450') || '0 0 560 400',
  width: '100%',
}))`
  height: 100%;
`;

export const inlineStyles = {
  pieChartPadding: {
    bottom: 20,
    left: 20,
    right: 20,
    top: 20,
  },
  pieChartStyle: {
    data: { fill: getSectorColor, stroke: '#ffffff', strokeWidth: 3 },
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

export const Header = styled.div`
  background-color: rgba(229, 229, 229, 0.3);
  padding: 1px 15px;
`;

export const Title = styled.h1`
  font-size: 18px;
`;

export const Body = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TotalMilestone = styled.div`
  text-align: right;
  padding: ${({ small }) => (small ? '25px' : '24px')};
  font-family: Axiforma, sans-serif;
`;

export const TotalMilestoneLabel = styled.div`
  font-size: ${({ small }) => (small ? '15px' : '16px')};
  color: #4a4a4a;
`;
export const TotalMilestoneNumber = styled.div`
  font-size: ${({ small }) => (small ? '28px' : '32px')};
  font-weight: bold;
  line-height: 35px;
  color: #02064a;
`;

export const PieContainer = styled(Box).attrs({
  width: 1,
})`
  height: calc(100% - 50px);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
`;

export const StyledPaper = styled(Paper)`
  && {
    width: 100%;
    margin-bottom: 15px;
  }
`;
