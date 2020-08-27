import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Score from 'components/Score';
import { STATUSES } from 'helpers/statuses';

import * as S from './styled';

// used only for some names comes from server
// which have some inappropriate values
const mapServerPropNamesToi18n = {
  indicatorId: 'id',
  groupName: 'group',
};

// used to definetly skip unnecessary values
const valuesToSkip = [
  'lat',
  'lng',
];

const getColumnLabel = (defaultName, serverKey, t, i18n) => {
  if (mapServerPropNamesToi18n[serverKey]) {
    return t(`common.${mapServerPropNamesToi18n[serverKey]}`);
  }
  if (i18n.exists(`common.${serverKey}`)) {
    return t(`common.${serverKey}`);
  }

  return defaultName;
};

const getPropValue = (pin, propName, regions) => {
  switch (propName) {
    case 'date':
      return new Date(pin[propName]).toLocaleDateString();
    case 'regionId':
      return (Number.isNaN(+pin[propName])
        ? pin[propName]
        : regions.find((region) => region.id === pin.regionId).name
      );
    default:
      return pin[propName];
  }
};

const Tooltip = ({
  columnNames,
  pin,
  regions,
  t,
  i18n,
  mapGroupingType,
}) => {
  const filteredColumnNames = columnNames.filter(({ propName }) => !valuesToSkip.includes(propName))
    .sort((v) => v.propName);

  return (
    mapGroupingType ? (
      <S.Container>
        <S.Label>
          {getPropValue(pin, 'regionName', regions)}
        </S.Label>
        <S.Value>
          {getPropValue(pin, 'value', regions)}
        </S.Value>
        {
          pin.status && (
            <S.Item>
              <Score value={pin.status} size={21} />
              <S.Desc>{t(`manageDashboard.${STATUSES[pin.status].i18nKey}`)}</S.Desc>
            </S.Item>
          )
        }
      </S.Container>
    ) : (
      <S.Wrapper>
        {filteredColumnNames.map(({ name, propName }) => (
          <S.Row key={propName}>
            <S.Left>
              {getColumnLabel(name, propName, t, i18n)}
            </S.Left>
            <S.Right>
              {getPropValue(pin, propName, regions)}
            </S.Right>
          </S.Row>
        ))}
      </S.Wrapper>
    )
  );
};

Tooltip.propTypes = {
  columnNames: PropTypes.array,
  pin: PropTypes.object.isRequired,
  regions: PropTypes.array,
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  mapGroupingType: PropTypes.bool.isRequired,
};

Tooltip.defaultProps = {
  columnNames: [],
  regions: [],
};

export default withTranslation()(Tooltip);
