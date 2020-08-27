import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import * as S from './styled';

const Title = ({
  title, sectionTitle, isUpdateLog, to, t,
}) => (
  <>
    <S.SectionTitle to={to}>{sectionTitle}</S.SectionTitle>
    <S.IndicatorTitle>{ isUpdateLog ? t('country.updates') : title}</S.IndicatorTitle>
  </>
);

Title.propTypes = {
  title: PropTypes.string,
  sectionTitle: PropTypes.string.isRequired,
  isUpdateLog: PropTypes.bool,
  to: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

Title.defaultProps = {
  title: '',
  isUpdateLog: false,
};

export default withTranslation()(Title);
