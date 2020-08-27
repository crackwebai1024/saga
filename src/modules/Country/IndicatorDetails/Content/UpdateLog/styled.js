import styled from 'styled-components';
import { Paper, Table } from '@material-ui/core';

export const TableWrapper = styled.div`
  overflow-x: auto;
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
    border-radius: 5px;
    box-shadow: 0 0 8px 2px #0000000c, 0 2px 4px 0 #00000034;
    background-color: #ffffff;
  }
`;
