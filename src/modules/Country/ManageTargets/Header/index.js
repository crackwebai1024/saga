import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import * as S from './styled';

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
        <S.StyledTableRow>
          {headRows.map((row) => (
            row.key === 'actions' || row.key === 'isPrimary' || row.key === 'value'
              ? (
                <S.RightTableCell type={row.key} key={row.key}>
                  {t(`common.${row.label.toLowerCase()}`)}
                </S.RightTableCell>
              )
              : (
                <TableCell
                  key={row.key}
                  sortDirection={orderBy === row.key ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === row.key}
                    direction={order}
                    onClick={this.createSortHandler(row.key)}
                  >
                    {t(`common.${row.label.toLowerCase()}`)}
                  </TableSortLabel>
                </TableCell>
              )
          ))}
        </S.StyledTableRow>
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
