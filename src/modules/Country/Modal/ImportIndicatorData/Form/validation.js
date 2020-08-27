import i18n from 'locales';

export const validate = (values, hasReportingPeriod) => {
  const errors = {};

  if (!values.indicatorId) {
    errors.indicatorId = i18n.t('invalid.indicator_is_required');
  }
  if (!values.file || !values.file.length) {
    errors.file = i18n.t('invalid.file_is_required');
  }
  if (hasReportingPeriod && !values.reportingPeriod) {
    errors.reportingPeriod = i18n.t('invalid.reporting_period_is_required');
  }

  return errors;
};

export const blank = () => {};
