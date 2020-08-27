import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Tabs as MuiTabs, Button } from '@material-ui/core';

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  margin-bottom: 10px;
`;

export const Tabs = styled(MuiTabs).attrs((props) => ({
  ...props,
  variant: 'fullWidth',
  centered: true,
}))`
  box-shadow: ${({ theme }) => `inset 0 -2px 0 0 ${theme.colors.borderGray}`};
  color: #666666;
  font-size: 0.875rem;
  line-height: 1.14;
  letter-spacing: 0.75px;

  .Mui-selected {
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: bold;
  }

  .MuiTabs-indicator {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

export const ContentRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 400px;
`;

export const ContentItem = styled.div`
  display: flex;
  flex: ${({ flex }) => flex};
  flex-direction: column;
  background: white;
  margin: 0 10px;
  box-shadow: 0 4px 14px rgba(53, 64, 82, 0.05);
  border-radius: 3px;
  height: 100%;
  width: 100%;
  position: relative;

  &:first-of-type {
    margin-left: 0;
    background-color: ${({ theme }) => theme.colors.filterBackground};
  }

  &:last-of-type {
    margin-right: 0;
  }
`;

export const ContentHeader = styled.div`
  background-color: ${({ theme }) => theme.colors.tableGray};
  display: flex;
  height: 31px;
  padding: 12px 20px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ViewCountryButton = styled(Button).attrs((props) => ({
  ...props,
  variant: 'contained',
  component: Link,
  color: 'primary',
}))`
  && {
    padding-left: 16px;
    padding-right: 16px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    border-radius: 16px;
    background-color: ${({ theme }) => theme.colors.primaryDarkBlue};
    border-color: ${({ theme }) => theme.colors.primaryDarkBlue};
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.07px;
    cursor: pointer;
    text-transform: none;
    color: ${({ theme }) => theme.colors.primaryWhite} !important;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    white-space: nowrap;

    &.Mui-disabled {
      background-color: ${({ theme }) => theme.colors.primaryDarkBlue};
      opacity: 0.2;
    }
  }
`;

export const ChartContainer = styled.div`
  flex-grow: 1;
  padding: 20px;
  padding-bottom: 0;
`;

export const ChartIndicatorHeader = styled.div`
  height: 28px;
  width: 100%;
  border-bottom: solid 2px ${({ theme }) => theme.colors.filterBorder};
`;

export const ChartRow = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  height: calc(100% - 30px);
`;

export const Chart = styled.div`
  flex: 3;
`;

export const ChartRightContent = styled.div`
  flex: 1;
  padding-top: 10px;
`;

export const ChartRightLabel = styled.div`
  margin-top: 12px;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0.08px;
  text-align: right;
  color: ${({ theme }) => theme.colors.primaryDark};
  text-transform: capitalize;
`;

export const ChartRightNumber = styled.div`
  font-size: 30px;
  line-height: 30px;
  font-weight: 600;
  letter-spacing: -0.14px;
  text-align: right;
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.primaryDarkBlue};
`;

export const ChartIndicatorText = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0.09px;
  padding-bottom: 10px;
`;

export const ContentItemText = styled.div`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.09px;
  width: calc(100% - 270px);
`;

export const ContentItemLink = styled.a`
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 18px;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.09px;
  width: calc(100% - 270px);
`;

export const TabContent = styled.div`
  width: 100%;
  margin-top: 41px;
  margin-bottom: 33px;
`;
