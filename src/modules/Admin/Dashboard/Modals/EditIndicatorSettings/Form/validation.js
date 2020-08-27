import i18n from 'locales';

export const validate = (values) => {
  const errors = {};

  if (!values.calculationType) {
    errors.calculationType = i18n.t('invalid.calculation_type_is_required');
  }
  if (!values.reportingPeriodType) {
    errors.reportingPeriodType = i18n.t('invalid.reporting_period_type_is_required');
  }
  if (!values.chartVisualizationType) {
    errors.chartVisualizationType = i18n.t('invalid.chart_visualization_is_required');
  }
  if (values.calculationType === 'real' && values.hasGrouping) {
    errors.calculationType = i18n.t('invalid.type_real_can_not_be_used_with_grouping');
  }
  if (values.reportingPeriodType === 'year' && values.chartVisualizationType === 'by_month') {
    errors.chartVisualizationType = i18n.t('invalid.chart_visualization_year');
  }
  if (values.reportingPeriodType === 'multiple_year' && values.chartVisualizationType === 'by_month') {
    errors.chartVisualizationType = i18n.t('invalid.chart_visualization_multiple_year');
  }
  if (values.chartVisualizationType === 'by_secondary'
   && (values.secondaryGrouping === null || values.secondaryGrouping === 'none')) {
    errors.secondaryGrouping = i18n.t('invalid.empty_secondary');
  }

  return errors;
};

export const blank = () => {};
