import React from 'react';
import PropTypes from 'prop-types';

import { withTranslation } from 'react-i18next';

import * as S from './styled';

const Counts = ({
  countries,
  projects,
  sections,
  indicators,
  t,
}) => (
  <S.Wrapper>
    <S.Description>
      {`${t('global.data_desc')}: `}
      <S.Item>
        <S.Count>{countries || t('common.na')}</S.Count> {t('common.countries')}
      </S.Item>
      {', '}
      <S.Item>
        <S.Count>{projects || t('common.na')}</S.Count> {t('common.projects')}
      </S.Item>
      {', '}
      <S.Item>
        <S.Count>{sections || t('common.na')}</S.Count> {t('common.sections')}
      </S.Item>
      {` ${t('common.and')} `}
      <S.Item>
        <S.Count>{indicators || t('common.na')}</S.Count> {t('common.indicators')}
      </S.Item>
    </S.Description>
  </S.Wrapper>
);

Counts.propTypes = {
  countries: PropTypes.number,
  projects: PropTypes.number,
  sections: PropTypes.number,
  indicators: PropTypes.number,
  t: PropTypes.func.isRequired,
};

Counts.defaultProps = {
  countries: undefined,
  projects: undefined,
  sections: undefined,
  indicators: undefined,
};

export default withTranslation()(Counts);
