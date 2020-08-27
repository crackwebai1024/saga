import styled from 'styled-components';
import { Table, Paper } from '@material-ui/core';

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled(Table).attrs((props) => ({
  'aria-labelledby': props['aria-labelledby'] || '',
}))`
  && {
    min-width: 750px;
  }
`;

export const StyledPaper = styled(Paper)`
  && {
    width: 100%;
    margin-bottom: 15px;
  }
`;
