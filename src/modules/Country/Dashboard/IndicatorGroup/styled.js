import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';
import MuiCard from '@material-ui/core/Card';

export const Card = styled(MuiCard).attrs(() => ({
  elevation: 2,
}))`
  position: relative;
  overflow: hidden;
  width: ${({ theme }) => theme.layout.indicatorCardSize};
  height: ${({ theme }) => theme.layout.indicatorCardHeight};
  display: flex;
  flex-direction: column;
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
  }
`;

export const HeadRow = styled.div`
  background-color: #e5e5e5;
  height: 54px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Content = styled.div`
  position: relative;
  padding: 15px;
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Count = styled(Typography).attrs(() => ({
  component: 'p',
}))`
  && {
    margin-top: auto;
    font-weight: 400;
    line-height: 1.2;
    color: #4a4a4a;
  }
`;

export const Result = styled(Typography).attrs(() => ({
  variant: 'h4',
  component: 'p',
}))`
  && {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    color: #4a4a4a;
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
    margin-top: auto;
    font-size: 0.875rem;
    line-height: 1.2;
    color: rgba(74, 74, 74, 0.8);
  }
`;

export const TargetValue = styled(Typography).attrs(() => ({
  component: 'span',
}))`
  && {
    display: inline-block;
    min-width: 40px;
    font-size: 0.875rem;
    font-weight: bold;
    text-align: right;
    color: ${({ theme }) => theme.countryTheme.colors.mainColor};
    margin-left: 20px;
  }
`;

export const Score = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`;
