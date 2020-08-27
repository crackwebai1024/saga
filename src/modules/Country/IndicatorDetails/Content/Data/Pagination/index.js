import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TablePagination from '@material-ui/core/TablePagination';

const Pagination = ({ t, tReady, ...props }) => (
  <TablePagination
    labelRowsPerPage={t('common.rows_per_page')}
    {...props}
  />
);

Pagination.propTypes = {
  component: PropTypes.string,
  backIconButtonProps: PropTypes.object,
  nextIconButtonProps: PropTypes.object,
  t: PropTypes.func.isRequired,
  tReady: PropTypes.any,
};

Pagination.defaultProps = {
  component: 'div',
  backIconButtonProps: {
    'aria-label': 'Previous Page',
  },
  nextIconButtonProps: {
    'aria-label': 'Next Page',
  },
  tReady: undefined,
};

export default withTranslation()(Pagination);
