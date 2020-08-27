import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withTranslation } from 'react-i18next';

const StyledTableHead = styled(TableHead)`
  && {
    background-color: ${({ theme }) => theme.colors.filterBackground};
    border-radius: 5px;
  }

  && > tr > th {
    border-radius: 5px;
    border: solid 1px ${({ theme }) => theme.colors.primaryWhite};
    background-color: ${({ theme }) => theme.colors.filterBackground};
    color: ${({ theme }) => theme.colors.primaryDark};
    font-size: 14px;
    letter-spacing: 0.07px;
    font-weight: 400;

    span {
      font-size: 14px;
      letter-spacing: 0.07px;
      color: ${({ theme }) => theme.colors.primaryDark};
      font-weight: 400;
    }
  }
`;

class EnhancedTableHead extends PureComponent {
  createSortHandler = (property) => (event) => {
    const { onRequestSort } = this.props;

    onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy,
      displayedValues,
      t,
    } = this.props;

    const cells = Array.from(displayedValues).map(([key, value]) => {
      let cellContent = t(`admin.${value}`);

      // cells with colors, logo shoudn't be sortable:
      const isSortable = !key.toLowerCase().includes('color') && key !== 'logo';

      if (isSortable) {
        cellContent = (
          <TableSortLabel
            active={orderBy === key}
            direction={order}
            onClick={this.createSortHandler(key)}
          >
            {t(`admin.${value}`)}
          </TableSortLabel>
        );
      }

      return (
        <TableCell
          key={key}
          color="secondary"
          sortDirection={orderBy === key ? order : false}
        >
          {cellContent}
        </TableCell>
      );
    });

    return (
      <StyledTableHead>
        <TableRow>
          {cells}
          <TableCell key="actions" />
        </TableRow>
      </StyledTableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  displayedValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EnhancedTableHead);
