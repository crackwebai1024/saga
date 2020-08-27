import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const StyledTableCell = styled(TableCell).attrs((props) => ({
  align: props.align || 'inherit',
}))`
  && {
    color: ${({ color }) => color};
  }
`;

export const StyledTableRow = styled(TableRow).attrs((props) => ({
  ...props,
}))`
  && .MuiTableCell-root {
    padding-top: 4px;
    padding-bottom: 4px;
    font-size: 12px;
    letter-spacing: 0.06px;
    font-weight: normal;
  }
`;
