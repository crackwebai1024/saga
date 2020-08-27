import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import * as S from './styled';

const Header = ({
  title,
  onBack,
  t,
}) => (
  <S.Wrapper>
    <S.ActionsArea>
      <Tooltip title={t('manageDashboard.back_to_sections')}>
        <IconButton
          aria-label={t('manageDashboard.back_to_sections')}
          onClick={onBack}
        >
          <S.ArrowBack />
        </IconButton>
      </Tooltip>
    </S.ActionsArea>
    <S.Title>{title}</S.Title>
  </S.Wrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Header);
