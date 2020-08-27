import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const EnhancedTableHead = ({
  headRows,
  orderBy,
  order,
  onRequestSort,
}) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headRows.map((row) => (
          <TableCell
            align={row.align}
            key={row.key}
            sortDirection={orderBy === row.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.key}
              direction={orderBy === row.key ? order : 'asc'}
              onClick={createSortHandler(row.key)}
            >
              {row.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired,
  order: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default EnhancedTableHead;
