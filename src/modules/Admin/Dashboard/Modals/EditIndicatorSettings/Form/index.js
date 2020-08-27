import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, FormSpy } from 'react-final-form';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormSelect from 'components/FormSelect';
import FormCheckbox from 'components/FormCheckbox';
import FormRadio from 'components/FormRadio';

import { validate } from './validation';

import * as S from './styled';

const isChecked = (name, modified, initialValues, values) => {
  const isModified = modified[name];
  return isModified ? values[name] : initialValues[name];
};

class IndicatorSettingsForm extends Component {
  state = {
    secondGropupingDisabled: !this.props.initialValues.hasGrouping,
    mapHasRegions: !this.props.initialValues.hasRegions,
  }

  getVisualizationOptions = (
    isReal,
    isSecondary,
    reportingPeriodType,
    hasGrouping,
  ) => {
    const { t } = this.props;
    if (isReal) {
      const options = [
        {
          value: 'none',
          name: t('manageDashboard.none'),
        },
        {
          value: 'by_name',
          name: t('manageDashboard.by_name'),
        },
      ];

      if (reportingPeriodType === 'date') {
        options.push(
          {
            value: 'by_day',
            name: t('manageDashboard.by_day'),
          },
        );
      }

      return options;
    }
    if (isSecondary) {
      const options = [
        {
          value: 'none',
          name: t('manageDashboard.none'),
        },
        {
          value: 'by_year',
          name: t('manageDashboard.by_years'),
        },
        {
          value: 'by_month',
          name: t('manageDashboard.by_months'),
        },
        {
          value: 'by_group',
          name: t('manageDashboard.by_groups'),
        },
        {
          value: 'by_secondary',
          name: t('manageDashboard.by_secondary'),
        },
      ];

      if (!hasGrouping && reportingPeriodType === 'date') {
        options.push(
          {
            value: 'by_day',
            name: t('manageDashboard.by_day'),
          },
        );
      }

      return options;
    }
    const options = [
      {
        value: 'none',
        name: t('manageDashboard.none'),
      },
      {
        value: 'by_year',
        name: t('manageDashboard.by_years'),
      },
      {
        value: 'by_month',
        name: t('manageDashboard.by_months'),
      },
      {
        value: 'by_group',
        name: t('manageDashboard.by_groups'),
      },
    ];

    if (reportingPeriodType === 'date') {
      options.push(
        {
          value: 'by_day',
          name: t('manageDashboard.by_day'),
        },
      );
    }
    return options;
  }

  mapGroupingDisabled = (calculationType, showMap) => {
    if (calculationType === 'real') {
      return true;
    }
    if (!showMap) {
      return true;
    }
    return false;
  }

  heatMapDisabled = (calculationType, showMap, mapGrouping) => {
    if (calculationType === 'real') {
      return true;
    }

    if (!showMap) {
      return true;
    }

    if (mapGrouping !== 'by_region') {
      return true;
    }

    return false;
  }

  hasGroupingDisabled = ({ chartViewType, chartVisualizationType }) => (
    chartViewType !== 'bar' || chartVisualizationType === 'by_day'
  );

  render() {
    const {
      onSubmit,
      onClose,
      initialValues,
      isFormDisabled,
      t,
      editSettingsDisabled,
      customFieldsWithIds,
      handleChangeHasGrouping,
      handleChangeIndicatorSettings,
    } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={{
          ...initialValues,
          hasMap: initialValues.hasMap !== null ? initialValues.hasMap : false,
          chartVisualizationType: (initialValues.hasGrouping === true
            && initialValues.secondaryGrouping !== null
            && initialValues.chartVisualizationType !== 'none')
            ? 'by_secondary' : initialValues.chartVisualizationType,
          mapGroupingType: initialValues.mapGroupingType ? initialValues.mapGroupingType : 'none',
          chartViewType: initialValues.chartViewType ? initialValues.chartViewType : 'bar',
        }}
        render={({
          handleSubmit,
          modified,
          values,
          dirty,
        }) => (
          <S.FormContentContainer onSubmit={handleSubmit}>
            <S.FormBlock>
              <FormSpy
                subscription={{ values: true, dirty: true }}
                onChange={handleChangeIndicatorSettings}
              />
              <S.Row>
                <S.RowCol>
                  <FormRadio
                    field={{
                      name: 'valueType',
                      label: t('common.value_type'),
                    }}
                    items={[
                      {
                        value: '#',
                        name: t('common.number'),
                      },
                      {
                        value: '%',
                        name: t('common.percentage'),
                      },
                    ]}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
                <S.RowCol>
                  <FormRadio
                    field={{
                      name: 'isPositiveProgress',
                      label: t('common.progress_type'),
                    }}
                    items={[
                      {
                        value: true,
                        name: t('common.increase'),
                      },
                      {
                        value: false,
                        name: t('common.decrease'),
                      },
                    ]}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
              </S.Row>
              <S.Row>
                <S.RowCol>
                  <FormSelect
                    field={{
                      inputType: 'select',
                      label: t('common.reporting_period_type'),
                      value: 'reportingPeriodType',
                      options: [
                        {
                          value: 'date',
                          name: t('common.date'),
                        },
                        {
                          value: 'month',
                          name: t('common.month'),
                        },
                        {
                          value: 'year',
                          name: t('common.year'),
                        },
                        {
                          value: 'multiple_year',
                          name: t('common.multiple_years'),
                        },
                      ],
                    }}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
                <S.RowCol>
                  <FormSelect
                    field={{
                      inputType: 'select',
                      label: t('common.calculation_type'),
                      value: 'calculationType',
                      options: [
                        {
                          value: 'real',
                          name: t('common.real'),
                        },
                        {
                          value: 'sum',
                          name: t('common.sum'),
                        },
                        {
                          value: 'average',
                          name: t('common.average'),
                        },
                        {
                          value: 'count',
                          name: t('common.count'),
                        },
                      ],
                    }}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
              </S.Row>
              <S.Row>
                <S.RowCol>
                  <FormSelect
                    field={{
                      inputType: 'select',
                      label: t('common.chart_visualization'),
                      value: 'chartVisualizationType',
                      options: this.getVisualizationOptions(
                        values.calculationType === 'real',
                        !this.state.secondGropupingDisabled,
                        values.reportingPeriodType,
                        values.hasGrouping,
                      ),
                    }}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
                <S.RowCol>
                  <FormRadio
                    field={{
                      name: 'chartViewType',
                      label: t('common.charttype'),
                    }}
                    items={[
                      {
                        value: 'bar',
                        name: t('common.bar'),
                      },
                      {
                        value: 'line',
                        name: t('common.line'),
                      },
                      {
                        value: 'barplusline',
                        name: t('common.barplusline'),
                      },
                    ]}
                    disabled={editSettingsDisabled || values.hasGrouping}
                  />
                </S.RowCol>

              </S.Row>
              <S.Row>
                <S.Title>{t('common.map_settings')}:</S.Title>
              </S.Row>
              <S.Row>
                <S.RowCol hasCheckbox>
                  <FormCheckbox
                    field={{
                      inputType: 'checkbox',
                      name: 'hasMap',
                      label: t('manageDashboard.use_map_tab'),
                    }}
                    checked={isChecked('hasMap', modified, initialValues, values)}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
                <S.RowCol hasCheckbox>
                  <FormCheckbox
                    field={{
                      inputType: 'checkbox',
                      name: 'hasRegions',
                      label: t('manageDashboard.has_regions'),
                    }}
                    checked={isChecked('hasRegions', modified, initialValues, values)}
                    onChange={(e) => this.setState({ mapHasRegions: e.value })}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
              </S.Row>
              <S.Row>
                <S.RowCol>
                  <FormSelect
                    field={{
                      inputType: 'select',
                      label: t('common.map_grouping'),
                      value: 'mapGroupingType',
                      options: this.state.mapHasRegions ? [
                        {
                          value: 'none',
                          name: t('manageDashboard.not_apply'),
                        },
                        {
                          value: 'by_group',
                          name: t('manageDashboard.by_group'),
                        },

                      ] : [
                        {
                          value: 'none',
                          name: t('manageDashboard.not_apply'),
                        },
                        {
                          value: 'by_group',
                          name: t('manageDashboard.by_group'),
                        },
                        {
                          value: 'by_region',
                          name: t('manageDashboard.by_region'),
                        },
                      ],
                    }}
                    disabled={editSettingsDisabled || this.mapGroupingDisabled(values.calculationType, values.hasMap)}
                  />
                </S.RowCol>
                <S.RowCol hasCheckbox>
                  <FormCheckbox
                    field={{
                      inputType: 'checkbox',
                      name: 'hasHeatMap',
                      label: t('manageDashboard.use_heat_map_tab'),
                    }}
                    checked={isChecked('hasHeatMap', modified, initialValues, values)}
                    disabled={
                      editSettingsDisabled
                      || this.heatMapDisabled(values.calculationType, values.hasMap, values.mapGroupingType)
                    }
                  />
                </S.RowCol>
              </S.Row>
              <S.Row>
                <S.Title>{t('common.grouping')}:</S.Title>
              </S.Row>
              <S.Row>
                <S.RowCol hasCheckbox>
                  <FormCheckbox
                    field={{
                      inputType: 'checkbox',
                      name: 'hasGrouping',
                      label: t('manageDashboard.use_grouping'),
                    }}
                    checked={isChecked('hasGrouping', modified, initialValues, values)}
                    onChange={(e) => {
                      this.setState({ secondGropupingDisabled: e.value });
                      handleChangeHasGrouping(!e.value);
                    }}
                    disabled={editSettingsDisabled || this.hasGroupingDisabled(values)}
                  />
                </S.RowCol>
                <S.RowCol>
                  <FormSelect
                    field={{
                      inputType: 'select',
                      label: t('common.second_grouping'),
                      value: 'secondaryGrouping',
                      options: !customFieldsWithIds ? [{
                        value: 'none',
                        name: t('manageDashboard.none'),
                      }]
                        : customFieldsWithIds.map((item) => ({
                          value: item.id,
                          name: item.name,
                        })).concat(
                          {
                            value: 'none',
                            name: t('manageDashboard.none'),
                          },
                        ),
                    }}
                    disabled={this.state.secondGropupingDisabled || editSettingsDisabled}
                    small
                  />
                  <FormHelperText>Use Custom Fields to add grouping options</FormHelperText>
                </S.RowCol>
              </S.Row>
              <S.Row>
                <S.Title>{t('admin.chart_color')}:</S.Title>
              </S.Row>
              <S.Row>
                <S.RowCol>
                  <FormSelect
                    field={{
                      inputType: 'select',
                      label: t('admin.color_palette'),
                      value: 'chartColorPalette',
                      options: [
                        {
                          value: 'blue_cyan',
                          name: t('admin.color.blue_cyan'),
                        },
                        {
                          value: 'blue_yellow',
                          name: t('admin.color.blue_yellow'),
                        },
                        {
                          value: 'blue_grey',
                          name: t('admin.color.blue_grey'),
                        },
                        {
                          value: 'cyan_grey',
                          name: t('admin.color.cyan_grey'),
                        },
                        {
                          value: 'yellow_grey',
                          name: t('admin.color.yellow_grey'),
                        },
                        {
                          value: 'grey_green',
                          name: t('admin.color.grey_green'),
                        },
                      ],
                    }}
                    disabled={editSettingsDisabled}
                  />
                </S.RowCol>
                <S.RowCol />
              </S.Row>
            </S.FormBlock>
            <DialogActions>
              <Button color="secondary" onClick={() => onClose(dirty)}>{t('common.close')}</Button>
              <Button
                variant="contained"
                color="primary"
                disabled={isFormDisabled || editSettingsDisabled}
                type="submit"
              >
                {t('common.save')}
              </Button>
            </DialogActions>
          </S.FormContentContainer>
        )}
      />
    );
  }
}
IndicatorSettingsForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  customFieldsWithIds: PropTypes.array.isRequired,
  editSettingsDisabled: PropTypes.bool.isRequired,
  handleChangeHasGrouping: PropTypes.func.isRequired,
  handleChangeIndicatorSettings: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  indicators: {
    customFieldsWithIds,
  },
}) => ({
  customFieldsWithIds,
});

export default connect(mapStateToProps)(withTranslation()(IndicatorSettingsForm));
