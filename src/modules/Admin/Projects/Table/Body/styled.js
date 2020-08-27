import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { TableRow, TableCell } from '@material-ui/core';

export const StyledTableRow = styled(TableRow)`
  cursor: ${({ cursor = 'auto' }) => cursor};

  && .MuiTableCell-root {
    padding-top: 9px;
    padding-bottom: 8px;
    font-size: 12px;
    letter-spacing: 0.06px;
    font-weight: normal;
  }
`;

export const StyledTableCell = styled(TableCell).attrs((props) => ({
  align: props.align || 'inherit',
}))`
  && {
    color: ${({ color }) => color};
  }
`;

export const Link = styled(RouterLink)`
  text-decoration: none;
`;
