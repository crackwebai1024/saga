import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import FormField from 'components/FormField';
import FormSelect from 'components/FormSelect';
import FormRadio from 'components/FormRadio';
import { showedStatuses } from 'helpers/statuses';

import { validate } from './validation';

import * as S from './styled';

const IndicatorsGroupForm = ({
  onSubmit,
  onClose,
  initialValues,
  isFormDisabled,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values)}
    initialValues={initialValues}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <FormField
          field={{
            inputType: 'text',
            label: t('common.name'),
            value: 'title',
          }}
          inputProps={{
            maxLength: 60,
          }}
        />
        <FormField
          field={{
            inputType: 'number',
            label: t('common.value'),
            value: 'value',
          }}
          inputProps={{
            min: 0,
          }}
        />
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
        />
        <FormField
          field={{
            inputType: 'number',
            label: t('common.target'),
            value: 'groupTarget',
          }}
          inputProps={{
            min: 0,
          }}
        />
        <FormSelect
          field={{
            inputType: 'select',
            label: t('common.status'),
            value: 'status',
            options: Object.keys(showedStatuses).map((key) => ({
              value: key,
              name: showedStatuses[key],
            })),
          }}
        />
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
        />
        <DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button color="primary" disabled={isFormDisabled} type="submit">{t('common.Save')}</Button>
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

IndicatorsGroupForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(IndicatorsGroupForm);
