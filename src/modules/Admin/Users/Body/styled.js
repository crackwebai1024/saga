import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';

export const Cell = styled(TableCell).attrs(() => ({

}))`
  &.MuiTableCell-root {
    padding: 14px 20px 14px 16px;
  }

  &.MuiTableCell-root:last-child {
    padding-right: 8px;
  }
`;

export const StyledTableCellActions = styled(Cell).attrs((props) => ({
  align: props.align || 'inherit',
}))`
  && {
    color: ${({ color }) => color};
    white-space: nowrap;
    padding-left: 0;
  }
`;

export const StyledRow = styled(TableRow).attrs(() => ({}))`
  && {
    &:last-of-type th,
    &:last-of-type td {
      border-bottom: none;
    }
  }
`;
