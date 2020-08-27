import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Tooltip from '@material-ui/core/Tooltip';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { DatePicker } from '@material-ui/pickers';
import { withTranslation } from 'react-i18next';

import Button from 'components/PrintButton';
import { periodsWithLabel, getCalendarView, getCalendarLabel } from 'helpers/getIndicatorFilters';

import Select from './Select';
import * as S from './styled';

const titleByCounty = {
  Australia: 'Vibrant Oceans Data Room',
  'Saudi Arabia': 'Ministry of Justice',
};

const Header = ({
  title,
  isGroup,
  countrySlug,
  selector,
  onPeriodChange,
  hasBack,
  t,
}) => {
  function onSelectorChange(kind, value) {
    const newSelector = {};
    if (kind === 'period') {
      newSelector.period = value;
      newSelector.value = moment();
    } else {
      newSelector.period = selector.period;
      newSelector.value = value;
    }
    onPeriodChange(newSelector);
  }

  return (
    <S.Wrapper>
      {hasBack && countrySlug && (
        <S.BackLink to={`/country/${countrySlug}/country-dashboard`}>
          <Tooltip title={t('common.back')}>
            <ArrowBack />
          </Tooltip>
        </S.BackLink>
      )}
      <S.TitleWrapper>
        <S.Title>
          {titleByCounty[title]
            ? titleByCounty[title]
            : `${title} ${isGroup ? '' : t('country.room')}`}
        </S.Title>
        {!isGroup && <S.Subtitle>{t('country.phrase')}</S.Subtitle>}
      </S.TitleWrapper>
      <Button handlePrint={() => window.print()} />
      <S.SelectBox>
        { selector
          && (
          <Select
            title={t('country.period')}
            name="period"
            items={periodsWithLabel}
            selected={selector.period}
            onChange={(value) => onSelectorChange('period', value)}
          />
          )}
      </S.SelectBox>
      <S.Calendar>
        {selector && selector.period !== 'all' && (
          <DatePicker
            variant="inline"
            {...getCalendarView(selector.period)}
            label={getCalendarLabel(selector.period)}
            value={selector.value}
            onChange={(value) => onSelectorChange('value', value)}
          />
        )}
      </S.Calendar>
    </S.Wrapper>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  isGroup: PropTypes.bool,
  countrySlug: PropTypes.string,
  selector: PropTypes.object.isRequired,
  onPeriodChange: PropTypes.func.isRequired,
  hasBack: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: '',
  isGroup: false,
  hasBack: false,
  countrySlug: undefined,
};

export default withTranslation()(Header);
