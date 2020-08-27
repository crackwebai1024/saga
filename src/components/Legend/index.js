import React from 'react';
import PropTypes from 'prop-types';

import Score from 'components/Score';
import { withTranslation } from 'react-i18next';

import { STATUSES } from 'helpers/statuses';
import { getRoundedValue } from 'helpers/valueToShow';
import * as S from './styled';

const items = [
  'on-target',
  'nearly-on-target',
  'nearly-not-on-target',
  'not-on-target',
];

const getRangeLabel = (values, index, isPositive = false) => {
  let startValue = index === 0 ? 0 : values[index - 1];
  let endValue = index === values.length ? null : values[index];
  if (isPositive) {
    startValue = index === values.length ? 0 : values[index];
    endValue = index === 0 ? null : values[index - 1];
  }
  // eslint-disable-next-line max-len
  return `(${getRoundedValue(startValue, 2, false)}${endValue === null ? '+' : `-${getRoundedValue(endValue, 2, false)}`})`;
};

const Legend = ({ t, values, isPositive }) => (
  <S.Wrapper>
    <S.Content>
      <S.Title>{t('common.scoring_key')}:</S.Title>
      {items.map((key, index) => (
        <S.Item key={key}>
          <Score value={key} size={18} />
          <S.Desc>
            {`${t(`manageDashboard.${STATUSES[key].i18nKey}`)}
            ${(values && values.length > 0) ? getRangeLabel(values, index, isPositive) : ''}`}
          </S.Desc>
        </S.Item>
      ))}
    </S.Content>
  </S.Wrapper>
);

Legend.propTypes = {
  t: PropTypes.func.isRequired,
  values: PropTypes.array,
  isPositive: PropTypes.bool,
};

Legend.defaultProps = {
  values: undefined,
  isPositive: false,
};

export default withTranslation()(Legend);
