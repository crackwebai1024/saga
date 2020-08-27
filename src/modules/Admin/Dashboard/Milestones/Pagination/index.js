import React from 'react';
import PropTypes from 'prop-types';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = (props) => (
  <TablePagination
    {...props}
  />
);

Pagination.propTypes = {
  component: PropTypes.string,
  backIconButtonProps: PropTypes.object,
  nextIconButtonProps: PropTypes.object,
};

Pagination.defaultProps = {
  component: 'div',
  backIconButtonProps: {
    'aria-label': 'Previous Page',
  },
  nextIconButtonProps: {
    'aria-label': 'Next Page',
  },
};

export default Pagination;
