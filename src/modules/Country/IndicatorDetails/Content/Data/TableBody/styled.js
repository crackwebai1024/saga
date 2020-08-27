import styled from 'styled-components';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableBody from '@material-ui/core/TableBody';

export const TableCell = styled(MuiTableCell)`
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle !important;
`;

export const TableRow = styled(MuiTableRow)``;

export const TableBody = styled(MuiTableBody)`
  ${TableRow} {
    border-bottom: 0.5px solid ${(({ theme }) => theme.colors.tableBorder)};

    &:hover {
      background-color: #f9f9fc !important;
    }
  }

  ${TableCell} {
    font-size: 0.875rem;
    border-bottom: 0.5px solid ${(({ theme }) => theme.colors.tableBorder)};
  }
`;
