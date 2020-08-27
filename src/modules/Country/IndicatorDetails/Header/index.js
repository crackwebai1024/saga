import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import moment from 'moment';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import { periods, getCalendarView, getCalendarLabel } from 'helpers/getIndicatorFilters';
import { getSectionTitle, getGroupTitle } from 'redux/country/selectors';

import AmplitudeService from 'services/amplitude';
import Tooltip from '@material-ui/core/Tooltip';
import { DatePicker } from '@material-ui/pickers';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from 'components/PrintButton';
import Values from './Values';
import Select from './Select';
import Title from './Title';

import * as S from './styled';

const Header = ({
  country,
  sectionId,
  groupId,
  indicatorData,
  selector,
  sectionTitle,
  groupTitle,
  t,
  printDashboard,
  actions,
  isUpdateLog,
  // countryDetails,
}) => {
  const handlePeriodChange = (value) => {
    actions.setIndicatorDetailsReportingSelector(value);
    AmplitudeService.logEvent('Reporting period has been changed', {
      countryId: (country && country.id) || 'null',
      selector: value,
    });
  };

  const onSelectorChange = (kind, value) => {
    const newSelector = {};
    if (kind === 'period') {
      newSelector.period = value;
      newSelector.value = moment();
    } else {
      newSelector.period = selector.period;
      newSelector.value = value;
    }
    handlePeriodChange(newSelector);
  };

  const dashboardLinkTo = groupId
    ? `/country/${country}/country-dashboard/section/${sectionId}/group/${groupId}`
    : `/country/${country}/country-dashboard`;
  const reportLink = `/country/${country}/country-dashboard/section/${sectionId}/indicator/${indicatorData.id}/report`;
  const backLinkTo = isUpdateLog ? reportLink : dashboardLinkTo;
  const Wrapper = isUpdateLog ? S.UpdateLogWrapper : S.Wrapper;
  return (
    <Wrapper>
      <S.LeftContainer>
        <S.BackLink to={backLinkTo}>
          <Tooltip title={t('common.back')}>
            <ArrowBack />
          </Tooltip>
        </S.BackLink>
        <S.TitleBox>
          <Title
            title={indicatorData.title}
            sectionTitle={groupId ? groupTitle : sectionTitle}
            isUpdateLog={isUpdateLog}
            to={backLinkTo}
          />
        </S.TitleBox>
      </S.LeftContainer>
      {
        !isUpdateLog && (
        <S.RightContainer>
          <Button handlePrint={printDashboard} />
          <S.SelectBox>
            {selector
              && (
              <Select
                title={t('country.period')}
                name="period"
                items={periods}
                selected={selector.period}
                onChange={(value) => onSelectorChange('period', value)}
              />
              )}
          </S.SelectBox>
          {selector && selector.period !== 'all' && (
            <S.Calendar>
              <DatePicker
                variant="inline"
                {...getCalendarView(selector.period)}
                label={getCalendarLabel(selector.period)}
                value={selector.value}
                onChange={(value) => onSelectorChange('value', value)}
              />
            </S.Calendar>
          )}
          <S.ValuesBox>
            <Values indicatorData={indicatorData} />
          </S.ValuesBox>
        </S.RightContainer>
        )
      }
    </Wrapper>
  );
};

Header.propTypes = {
  country: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  groupId: PropTypes.string,
  sectionTitle: PropTypes.string.isRequired,
  groupTitle: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  // connect
  selector: PropTypes.object.isRequired,
  indicatorData: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    setIndicatorDetailsReportingFilter: PropTypes.func.isRequired,
    setIndicatorDetailsReportingSelector: PropTypes.func.isRequired,
    getIndicatorDataRequest: PropTypes.func.isRequired,
  }).isRequired,
  countryDetails: PropTypes.object,
  printDashboard: PropTypes.func.isRequired,
  isUpdateLog: PropTypes.bool,
};

Header.defaultProps = {
  groupId: undefined,
  isUpdateLog: false,
  countryDetails: undefined,
};

const mapStateToProps = ({
  indicatorDetails: {
    selector,
    indicatorData,
  },
  country: {
    details,
    сountry: countryDetails,
  },
}, props) => ({
  selector,
  indicatorData,
  countryDetails,
  sectionTitle: getSectionTitle(details, props),
  groupTitle: getGroupTitle(details, props),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Header));
