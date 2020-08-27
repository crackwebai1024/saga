import React from 'react';
import PropTypes from 'prop-types';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EnhancedTableHead = ({ headRows }) => (
  <TableHead>
    <TableRow>
      {headRows.map((row) => (
        <TableCell
          align={row.align}
          key={row.key}
        >
          {row.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

EnhancedTableHead.propTypes = {
  headRows: PropTypes.array.isRequired,
};

export default EnhancedTableHead;
