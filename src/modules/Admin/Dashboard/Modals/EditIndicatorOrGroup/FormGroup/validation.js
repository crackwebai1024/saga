export const validate = (values, t) => {
  const errors = {};

  if (!values.title) {
    errors.title = t('invalid.indicator_group_name_is_required');
  }
  if (!values.groupTarget) {
    errors.groupTarget = t('invalid.target_is_required');
  }
  if (!values.status) {
    errors.status = t('invalid.status_is_required');
  }
  if (!values.reportingPeriodType) {
    errors.reportingPeriodType = t('invalid.reporting_period_type_is_required');
  }

  return errors;
};

export const blank = () => {};
