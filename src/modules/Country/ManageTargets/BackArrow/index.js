import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Tooltip from '@material-ui/core/Tooltip';
import ArrowBack from '@material-ui/icons/ArrowBack';

import * as S from './styled';

const BackArrow = ({ location, t }) => (
  <S.Title>
    <S.BackLink to={location.pathname.replace('targets', '')}>
      <Tooltip title={t('common.back')}>
        <ArrowBack />
      </Tooltip>
    </S.BackLink>
    <S.TitleBox>
      <S.SectionTitle>{t('admin.country_dashboard')}</S.SectionTitle>
    </S.TitleBox>
  </S.Title>
);

BackArrow.propTypes = {
  t: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(withTranslation()(BackArrow));
