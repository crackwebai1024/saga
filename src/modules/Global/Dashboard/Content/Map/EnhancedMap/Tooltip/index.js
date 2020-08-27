import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { STATUSES } from 'helpers/statuses';
import * as S from './styled';

const Tooltip = ({ pin, t }) => (
  <S.Wrapper>
    <S.Row mb={10}>
      <S.Title to={`/country/${pin.slug}/country-dashboard`}>
        {pin.name}
      </S.Title>
    </S.Row>
    <S.Row mb={10} color={STATUSES[pin.status].color} fullWidth>
      <S.Div>
        <span className="bold">{`${pin.onTrack}%`}</span> <span>{` ${t('common.on_track')}`}</span>
      </S.Div>
    </S.Row>
    <S.Row mb={0}>
      <S.Text>
        <span className="bold">{pin.indicatorsCount}</span> {t('common.indicators')}
      </S.Text>
    </S.Row>
    <S.Row mb={12}>
      <S.Text>
        <span className="bold">{pin.sectionsCount}</span> {t('common.sections')}
      </S.Text>
    </S.Row>
    <S.Row mb={5}>
      <S.ViewCountryButton
        fullWidth
        to={`/country/${pin.slug}/country-dashboard`}
      >
        {t('global.view_country_dashboard')}
      </S.ViewCountryButton>
    </S.Row>
  </S.Wrapper>
);

Tooltip.propTypes = {
  pin: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Tooltip);
