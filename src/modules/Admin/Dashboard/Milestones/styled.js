import styled from 'styled-components';

import { Box, Flex } from '@rebass/grid';
import { Paper, Table } from '@material-ui/core';
import MuiPaper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';

export const Container = styled(Flex).attrs(() => ({
  flexDirection: 'column',
  my: 0,
  width: 1,
}))`
  max-width: ${({ theme }) => theme.layout.contentMaxWidth};
  padding: ${({ theme }) => theme.layout.contentPadding};
`;

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colors.primaryBlue};
  margin: 20px 0;
  font-size: 14px;
  color: #329bdb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 150px;
`;

export const Content = styled(Flex).attrs(() => ({
  justifyContent: 'space-between',
  flexDirection: 'column',
  flexWrap: 'wrap',
  width: 1,
}))`

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
