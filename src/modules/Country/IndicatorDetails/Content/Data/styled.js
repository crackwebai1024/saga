import styled from 'styled-components';
import MuiTable from '@material-ui/core/Table';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableHead from '@material-ui/core/TableHead';

export const TableWrapper = styled.div`
  overflow: auto;
`;

export const Table = styled(MuiTable)`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
`;

export const TableCell = styled(MuiTableCell)``;

export const TableRow = styled(MuiTableRow)``;

export const TableHead = styled(MuiTableHead)`
  ${TableCell} {
    font-size: 12px;
    line-height: 17px;
    align-items: center;
    color: rgba(74, 74, 74, 0.6);
  }
`;
