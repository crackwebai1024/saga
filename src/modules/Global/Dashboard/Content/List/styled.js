import styled from 'styled-components';
import MuiTable from '@material-ui/core/Table';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableHead from '@material-ui/core/TableHead';
import { Typography, Paper } from '@material-ui/core';
import Pagination from './Pagination';

export const TableWrapper = styled.div`
  overflow: auto;
`;

export const Table = styled(MuiTable)`
  overflow: hidden;
`;

export const TableCell = styled(MuiTableCell)`
  && {
    background-color: ${({ theme }) => theme.colors.filterBackground};
    border-radius: 5px;
  }
`;

export const TableRow = styled(MuiTableRow)``;

export const TableHead = styled(MuiTableHead)`
  ${TableCell} {
    font-size: 14px;
    letter-spacing: 0.07px;
    padding-top: 11px;
    padding-bottom: 11px;
    color: ${({ theme }) => theme.colors.primaryDark};
    border-radius: 5px;
    border: solid 1px ${({ theme }) => theme.colors.primaryWhite};
    background-color: ${({ theme }) => theme.colors.filterBackground};
    font-weight: 400;
    vertical-align: middle;

    span {
      font-size: 14px;
      letter-spacing: 0.07px;
      color: ${({ theme }) => theme.colors.primaryDark};
      font-weight: 400;
      vertical-align: sub;
    }
  }
`;

export const Label = styled(Typography).attrs(() => ({
  variant: 'h6',
  component: 'h2',
}))`
  && {
    width: 220px;
    height: 18px;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 0.09px;
    line-height: 18px;
    color: ${({ theme }) => theme.colors.primaryDark};
    margin-bottom: 20px;
  }
`;

export const StyledPaper = styled(Paper)`
  && {
    border-radius: 5px;
    box-shadow: 0 3px 8px 2px #00000005, 0 2px 4px 0 #00000034;
    background-color: ${({ theme }) => theme.colors.primaryWhite};
  }
`;

export const StyledPagination = styled(Pagination)`
  && {
    border-radius: 5px;
    border: solid 1px ${({ theme }) => theme.colors.filterBackground};
    background-color: ${({ theme }) => theme.colors.filterBackground};

    .MuiTablePagination-select {
      font-size: 12px;
      letter-spacing: 0.06px;
      line-height: 18px;
      background: #fdfdfd;
    }
  }
`;
