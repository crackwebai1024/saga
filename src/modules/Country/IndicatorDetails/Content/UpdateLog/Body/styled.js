import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import { TableRow } from '@material-ui/core';

export const Cell = styled(TableCell).attrs(() => ({

}))`
  &.MuiTableCell-root {
    padding: 16px 20px 17px 16px;
    font-size: 16px;
    letter-spacing: 0.08px;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-weight: 500;
  }
`;

export const StyledRow = styled(TableRow).attrs((props) => ({
  ...props,
}))`
  && {
    border-top: solid 1px #cccccc;
    border-bottom: none;
  }
`;
