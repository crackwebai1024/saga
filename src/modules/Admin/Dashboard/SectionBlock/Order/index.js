import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const Order = ({
  max, current, orderUpdate, t,
}) => (
  <>
    {current === 0 ? null : (
      <Tooltip title={t('manageDashboard.upward_section')}>
        <IconButton
          aria-label={t('manageDashboard.upward_section')}
          onClick={() => orderUpdate(current, current - 1)}
        >
          <ArrowUpward />
        </IconButton>
      </Tooltip>
    )}
    {current === max ? null : (
      <Tooltip title={t('manageDashboard.downward_section')}>
        <IconButton
          aria-label={t('manageDashboard.downward_section')}
          onClick={() => orderUpdate(current, current + 1)}
        >
          <ArrowDownward />
        </IconButton>
      </Tooltip>
    )}
  </>
);

Order.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  orderUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Order);
