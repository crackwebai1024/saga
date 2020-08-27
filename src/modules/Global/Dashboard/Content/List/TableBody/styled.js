import styled from 'styled-components';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableBody from '@material-ui/core/TableBody';
import { Link } from 'react-router-dom';

export const TableCell = styled(MuiTableCell)`
  && {
    font-size: 12px !important;
    letter-spacing: 0.06px !important;
    line-height: 18px;
    vertical-align: middle !important;
    color: ${({ theme }) => theme.colors.primaryDark};
    border-bottom: 0.5px solid ${({ theme }) => theme.colors.tableGray} !important;
  }
`;

export const TableRow = styled(MuiTableRow)``;

export const RowLink = styled(Link)`
  display: table-row;
  text-decoration: none;

  &:hover {
    background-color: #f9f9fc !important;
  }
`;

export const TableBody = styled(MuiTableBody)`
  ${RowLink} {
    border-bottom: 0.5px solid ${(({ theme }) => theme.colors.tableBorder)};
  }

  ${TableCell} {
    font-size: 0.875rem;
    border-bottom: 0.5px solid ${(({ theme }) => theme.colors.tableBorder)};
  }
`;
