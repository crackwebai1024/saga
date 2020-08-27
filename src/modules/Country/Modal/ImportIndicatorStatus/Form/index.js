import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import FormSelect from 'components/FormSelect';

import { INDICATOR_STATUSES } from 'helpers/statuses';
import { getYearsRange } from 'helpers/getYears';
import FormField from '../TextField';
import { formFields } from './config';
import * as S from './styled';

const ImportForm = ({
  onSubmit,
  onClose,
  initialValues,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      ...initialValues,
      status: initialValues.status !== null ? initialValues.status.toString() : null,
      year: initialValues.year !== null ? initialValues.year.toString() : null,
    }}
    render={({
      handleSubmit,
    }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <S.Row>
          <FormSelect
            field={{
              inputType: 'select',
              label: t('common.year'),
              value: 'year',
              options: getYearsRange().map((year) => ({
                value: year,
                name: year,
              })),
            }}
            disabled
          />
          <FormSelect
            field={{
              inputType: 'status',
              label: t('common.status'),
              value: 'status',
              options: Object.entries(INDICATOR_STATUSES).reverse().map(([status, data]) => ({
                value: status,
                name: t(`common.${data.key}`),
              })),
            }}
          />
        </S.Row>

        {formFields.map(({
          label, value, inputType, title,
        }, index) => (
          <S.Row key={index}>
            <S.Column>
              <S.Label>{label}</S.Label>
              <FormField
                field={{
                  inputType,
                  label,
                  value,
                  title,
                }}
                maxTextLength={600}
              />
            </S.Column>
          </S.Row>
        ))}
        <S.StyledDialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button
            color="primary"
            type="submit"
          >
            {t('common.save')}
          </Button>
        </S.StyledDialogActions>
      </S.FormContentContainer>
    )}
  />
);

ImportForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ImportForm);
