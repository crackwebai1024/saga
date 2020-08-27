import styled from 'styled-components';

import { Box, Flex } from '@rebass/grid';
import { Paper, Table } from '@material-ui/core';
import MuiPaper from '@material-ui/core/Paper';

export const Container = styled(Flex).attrs(() => ({
  flexDirection: 'column',
  my: 75,
  width: 1,
}))`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  margin-top: 0;
`;

export const Content = styled(Flex).attrs(() => ({
  justifyContent: 'space-between',
  flexDirection: 'column',
  flexWrap: 'wrap',
  width: 1,
}))`

`;

export const TopRowItem = styled(Flex)`
  flex: 1;

  &:first-child {
    margin-right: 10px;
  }

  &:last-child {
    margin-left: 10px;
  }
`;

export const TopRow = styled(Flex)`
  flex-direction: row;
  height: 400px;
`;

export const ToolbarWrapper = styled(Flex).attrs(() => ({
  flexDirection: 'row',
  width: 1,
}))`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  justify-content: flex-end;
`;

export const Title = styled(Box).attrs(() => ({
  fontSize: 30,
  mb: '8px',
}))`
  color: ${({ theme }) => theme.colors.secondaryGrey};
  font-weight: 600;
`;

export const TableWrapper = styled(MuiPaper).attrs(() => ({
  elevation: 3,
}))`
  && {
    min-width: 100%;
    overflow-x: auto;
  }
`;

export const StyledPaper = styled(Paper)`
  && {
    width: 100%;
    margin-bottom: 15px;
  }
`;

export const StyledTable = styled(Table).attrs((props) => ({
  'aria-labelledby': props['aria-labelledby'] || '',
}))`
  && {
    min-width: 750px;
  }
`;

export const MilestoneTitle = styled(Box).attrs(() => ({
  fontSize: 24,
  mb: '8px',
}))`
  color: ${({ theme }) => theme.colors.secondaryGrey};
  font-weight: 500;
`;
