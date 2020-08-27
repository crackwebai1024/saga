import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import Tooltip from '@material-ui/core/Tooltip';

import * as S from './styled';

const Order = ({
  max,
  current,
  orderUpdate,
  t,
  disabled,
}) => (
  <S.OrderContainer>
    {current === 1 ? null : (
      <Tooltip title={t('manageDashboard.upward_field')}>
        <S.StyledIconButton
          aria-label={t('manageDashboard.upward_field')}
          onClick={() => orderUpdate(current - 1, current)}
          disabled={disabled}
        >
          <ArrowUp />
        </S.StyledIconButton>
      </Tooltip>
    )}
    {current === max ? null : (
      <Tooltip title={t('manageDashboard.downward_field')}>
        <S.StyledIconButton
          aria-label={t('manageDashboard.downward_field')}
          onClick={() => orderUpdate(current, current + 1)}
          disabled={disabled}
        >
          <ArrowDown />
        </S.StyledIconButton>
      </Tooltip>
    )}
  </S.OrderContainer>
);

Order.propTypes = {
  max: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  orderUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withTranslation()(Order);
