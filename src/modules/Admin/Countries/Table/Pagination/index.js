import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TablePagination from '@material-ui/core/TablePagination';

const StyledPagination = styled(TablePagination)`
  && {
    border-radius: 5px;
    border: solid 1px ${({ theme }) => theme.colors.filterBackground};
    background-color: ${({ theme }) => theme.colors.filterBackground};
 
    .MuiTablePagination-select {
      font-size: 12px;
      letter-spacing: 0.06px;
      line-height: 19px;
    }
  }
`;

const Pagination = ({ t, tReady, ...props }) => (
  <StyledPagination
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
