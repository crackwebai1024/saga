import styled from 'styled-components';
import { Table } from '@material-ui/core';

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
