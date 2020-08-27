import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import styled from 'styled-components';

const StyledTableCell = styled(TableCell)`
  && {
    border-radius: 5px;
    background-color: #f7f7f7;
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 12px;
    letter-spacing: 0.07px;
    font-weight: 400;
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
      font-size: 12px;
      letter-spacing: 0.07px;
      color: ${({ theme }) => theme.colors.primaryDark};
      font-weight: 400;
    }
  }
`;

class EnhancedTableHead extends Component {
  createSortHandler = (property) => (event) => {
    const { onRequestSort } = this.props;

    onRequestSort(event, property);
  };

  render() {
    const {
      headRows,
      order,
      orderBy,
      t,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {headRows.map((row) => (
            row.key === 'actions' || row.key === 'countries'
              ? (
                <StyledTableCell key={row.key}>
                  {row.i18nKey ? t(`admin.${row.i18nKey}`) : ''}
                </StyledTableCell>
              )
              : (
                <StyledTableCell
                  key={row.key}
                  sortDirection={orderBy === row.key ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === row.key}
                    direction={order}
                    onClick={this.createSortHandler(row.key)}
                  >
                    {t(`admin.${row.i18nKey}`)}
                  </TableSortLabel>
                </StyledTableCell>
              )
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EnhancedTableHead);
