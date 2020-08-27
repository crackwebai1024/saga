import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import FormCheckbox from 'components/FormCheckbox';
import Uploader from 'components/Uploader';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormSelect from 'components/FormSelect';

import { getYearsRange } from 'helpers/getYears';
import { validate } from './validation';

import * as S from './styled';

const ImportForm = ({
  onSubmit,
  onClose,
  initialValues,
  isFormDisabled,
  indicatorsList,
  reportingPeriodType,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values, reportingPeriodType === 'year')}
    initialValues={{
      ...initialValues,
      deleteOldData: false,
    }}
    render={({
      handleSubmit,
      values,
    }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <FormSelect
          field={{
            inputType: 'select',
            label: t('common.indicator'),
            value: 'indicatorId',
            options: indicatorsList.map((indicator) => ({
              value: indicator.id,
              name: indicator.title,
            })),
          }}
          disabled
        />
        {reportingPeriodType === 'year' && (
          <FormSelect
            field={{
              inputType: 'select',
              label: t('country.period'),
              value: 'reportingPeriod',
              options: getYearsRange().map((year) => ({
                value: year,
                name: year,
              })),
            }}
          />
        )}
        <Uploader name="file" accept={['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']} />
        <S.FontReduce>
          <FormCheckbox
            field={{
              inputType: 'checkbox',
              name: 'deleteOldData',
              label: t('country.delete_old_data'),
            }}
          />
        </S.FontReduce>
        <DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button
            color="primary"
            type="submit"
            disabled={isFormDisabled || !values.file || !values.file.length}
          >
            {t('common.import')}
          </Button>
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

ImportForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  indicatorsList: PropTypes.array.isRequired,
  reportingPeriodType: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ImportForm);
