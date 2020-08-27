import styled from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MuiCard from '@material-ui/core/Card';

import MuiIconButton from '@material-ui/core/IconButton';
import TimerIcon from '@material-ui/icons/Timer';
import MuiExpandIcon from '@material-ui/icons/ExpandMore';
import MuiEditIcon from '@material-ui/icons/Edit';

import ChartIcon from 'images/indicator-chart.svg';
import HighlightsIcon from 'images/indicator-highlights.svg';
import MapIcon from 'images/indicator-map.svg';
import MilestonesIcon from 'images/indicator-milestones.svg';

export const Link = styled(RouterLink)`
  text-decoration-line: underline;
  color: ${({ theme }) => theme.countryTheme.colors.mainColor};
  font-size: 12px;

  @media print {
    display: none;
  }

  :hover {
    text-decoration-line: none;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  height: 100%;
`;

export const IconButton = styled(MuiIconButton).attrs(({ props }) => ({
  ...props,
}))`
  && {
    padding: 0;
    margin-top: ${({ status }) => (status ? '23px' : '47px')};
  }
`;

export const MilestoneIcon = styled(TimerIcon).attrs(({ props }) => ({
  ...props,
}))`
  && {
    color: rgba(38, 50, 62, 0.6);

    @media print {
      display: none;
    }
  }
`;

export const ExpandIcon = styled(MuiExpandIcon).attrs(({ props }) => ({
  ...props,
}))`
  && {
    color: ${({ theme }) => theme.countryTheme.colors.mainColor};

    @media print {
      display: none;
    }
  }
`;

export const EditIcon = styled(MuiEditIcon).attrs(({ props }) => ({
  ...props,
}))`
  && {
    color: rgba(38, 50, 62, 0.6);

    @media print {
      display: none;
    }
  }
`;

export const Card = styled(MuiCard).attrs(() => ({
  elevation: 4,
}))`
  && {
    position: relative;
    overflow: hidden;
    width: ${({ theme }) => theme.layout.indicatorCardSize};
    height: ${({ theme }) => theme.layout.indicatorCardHeight};
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media print {
      page-break-inside: avoid;
    }
  }
`;

export const Header = styled(Typography).attrs(() => ({
  variant: 'h6',
  component: 'h3',
}))`
  && {
    display: flex;
    align-items: center;
    height: 54px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 18px;
    color: #4a4a4a;
    overflow: hidden;
    cursor: pointer;
  }
`;

export const HeadRow = styled.div`
  align-items: center;
  background-color: #e5e5e5;
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Content = styled.div`
  position: relative;
  padding: 0 20px;
  cursor: pointer;
`;

export const Result = styled(Typography).attrs(() => ({
  variant: 'h4',
  component: 'p',
}))`
  && {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    color: ${({ status }) => (status ? status.color : '#4a4a4a')};
  }
`;

export const NoResult = styled(Typography).attrs(() => ({
  component: 'span',
}))`
  && {
    font-size: 1rem;
    font-weight: 400;
  }
`;

export const Period = styled(Typography).attrs(() => ({

}))`
  && {
    font-size: 12px;
    line-height: 17px;
    margin-bottom: 12px;
  }
`;

export const Target = styled(Typography).attrs(() => ({

}))`
  && {
    font-size: 0.875rem;
    line-height: 1.2;
    color: rgba(74, 74, 74, 0.8);
  }
`;

export const Score = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

export const RowContainer = styled.div`
  display: flex;
`;

export const Highlight = styled.span`
  color: ${({ color }) => color || null};
  font-weight: ${({ fontWeight }) => fontWeight || null};
`;

export const ExpandButton = styled.button`
  width: 100%;
  max-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(229, 229, 229, 0.3);
  border-radius: 0 0 4px 4px;
  border: none;
  transition: background-color 150ms;
  cursor: pointer;
  user-select: none;

  @media print {
    display: none;
  }

  :hover {
    background-color: rgb(229, 229, 229);
  }

  :focus {
    outline: 0;
    background-color: rgb(229, 229, 229);
  }
`;

export const IndicatorIcons = styled.div`
  display: flex;
`;

export const IndicatorIcon = styled.button`
  height: 40px;
  width: 25%;
  border: 0;
  background-color: rgba(229, 229, 229, 0.3);
  margin: 0 1px;
  outline: 0;
  cursor: pointer;
  padding: 10px;

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const ChartImg = styled.img.attrs(() => ({
  src: ChartIcon,
}))`
  height: 100%;
`;

export const HighlightsImg = styled.img.attrs(() => ({
  src: HighlightsIcon,
}))`
  height: 100%;
`;

export const MapImg = styled.img.attrs(() => ({
  src: MapIcon,
}))`
  height: 100%;
`;

export const MilestonesImg = styled.img.attrs(() => ({
  src: MilestonesIcon,
}))`
  height: 100%;
`;
