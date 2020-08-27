import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import FormField from 'components/FormField';
import FormRadio from 'components/FormRadio';
import Button from '@material-ui/core/Button';
import FormSelect from 'components/FormSelect';

import { STATUSES } from 'helpers/statuses';
import { getYearsRange } from 'helpers/getYears';
import { validate } from './validation';

import * as S from './styled';

const ImportForm = ({
  onSubmit,
  onClose,
  onDelete,
  initialValues,
  isFormDisabled,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values)}
    initialValues={{
      ...initialValues,
      value: initialValues.value !== null ? initialValues.value.toString() : null,
      groupTarget: initialValues.groupTarget !== null ? initialValues.groupTarget.toString() : null,
      valueType: initialValues.valueType !== null ? initialValues.valueType : '#',
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
              options: Object.entries(STATUSES).reverse().map(([status, data]) => ({
                value: status,
                name: t(`common.${data.key}`),
              })),
            }}
          />
        </S.Row>
        <FormField
          field={{
            inputType: 'number',
            label: t('common.value'),
            value: 'value',
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
            label: t('country.group_target'),
            value: 'groupTarget',
          }}
        />
        <S.StyledDialogActions>
          <S.LeftSideContent>
            <Button color="secondary" onClick={onDelete}>{t('common.delete')}</Button>
          </S.LeftSideContent>
          <S.RightSideContent>
            <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
            <Button
              color="primary"
              type="submit"
              disabled={isFormDisabled}
            >
              {t('common.save')}
            </Button>
          </S.RightSideContent>
        </S.StyledDialogActions>
      </S.FormContentContainer>
    )}
  />
);

ImportForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ImportForm);
