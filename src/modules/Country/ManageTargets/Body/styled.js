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

export const StyledTableRow = styled(TableRow)`
  background-color: ${({ theme }) => theme.countryTheme.colors.mainColor};
`;

export default StyledTableCell;
