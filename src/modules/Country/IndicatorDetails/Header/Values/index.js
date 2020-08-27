import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import getPraparedValueForShow from 'helpers/valueToShow';
import Score from 'components/Score';
import { STATUSES } from 'helpers/statuses';
import * as S from './styled';

const Result = ({
  indicatorData: {
    value,
    valueType,
    target,
    status,
    manualStatus,
    isPositiveProgress,
  },
  t,
}) => (
  <S.Wrapper>
    <S.TotalLabel>{`${t('country.period_total')}:`}</S.TotalLabel>
    <S.Inner>
      <Score value={manualStatus || status} size={24} />
      <S.Value color={STATUSES[manualStatus || status]?.color}>
        {value === null || value === undefined
          ? <S.NoValue>{t('common.na')}</S.NoValue>
          : `${getPraparedValueForShow(value)}${valueType === '%' ? '%' : ''}`}
      </S.Value>
    </S.Inner>
    <S.Target>
      <S.TargetValue>
        {
        // eslint-disable-next-line max-len
        `${t('country.target')}: ${getPraparedValueForShow(target) > 0 ? `${isPositiveProgress ? '>' : '<'} ${getPraparedValueForShow(target)}` : getPraparedValueForShow(target)}${valueType === '%' ? '%' : ''}`
        }
      </S.TargetValue>
    </S.Target>
  </S.Wrapper>
);

Result.propTypes = {
  indicatorData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Result);
