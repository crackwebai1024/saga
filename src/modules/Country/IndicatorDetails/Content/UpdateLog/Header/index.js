import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';

const StyledTableCell = styled(TableCell)`
  && {
    border-radius: 5px;
    background-color: #f7f7f7;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.07px;
    padding-right: 6px;
    border-bottom: 1px solid white;
    border-top: 1px solid white;
    min-width: 120px;

    &:not(:last-of-type) {
      border-right: 3px solid white;
    }

    &:not(:first-of-type) {
      border-left: 1px solid white;
    }

    span {
      font-size: 14px;
      letter-spacing: 0.07px;
      color: ${({ theme }) => theme.colors.primaryDark};
      font-weight: 500;
    }
  }
`;

const EnhancedTableHead = ({ headRows, t }) => (
  <TableHead>
    <TableRow>
      {headRows.map((row) => (
        <StyledTableCell key={row.key}>
          {row.i18nKey ? t(`country.update_log_table.${row.i18nKey}`) : ''}
        </StyledTableCell>
      ))}
    </TableRow>
  </TableHead>
);

EnhancedTableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EnhancedTableHead);
