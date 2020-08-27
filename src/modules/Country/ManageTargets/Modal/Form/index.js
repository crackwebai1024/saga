import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-final-form';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import FormField from 'components/FormField';
import FormSelect from 'components/FormSelect';
import FormCheckbox from 'components/FormCheckbox';

import { getAllIndicators } from 'helpers/getIndicators';

import { validate } from './validation';

import * as S from './styled';

const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

const isChecked = (name, modified, initialValues, values) => {
  const isModified = modified[name];
  return isModified ? values[name] : initialValues[name];
};

const UserForm = ({
  isFormDisabled,
  onSubmit,
  onClose,
  types,
  initialValues,
  isEditing,
  t,
}) => (
  <Form
    initialValues={{
      ...initialValues,
    }}
    onSubmit={onSubmit}
    validate={(values) => validate(values, t)}
    render={({ handleSubmit, modified, values }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <S.Row>
          <FormSelect
            field={{
              inputType: 'select',
              label: t('common.indicator'),
              value: 'title',
              options: getAllIndicators(types.sections)
                .map((key) => ({
                  value: key,
                  name: key,
                })),
            }}
            disabled={isEditing}
          />
        </S.Row>
        <S.Row>
          <FormSelect
            field={{
              inputType: 'select',
              label: t('common.year'),
              value: 'year',
              options: years
                .map((key) => ({
                  value: key,
                  name: key,
                })),
            }}
            disabled={isEditing}
          />
        </S.Row>
        <S.Row>
          <FormField
            field={{
              inputType: 'number',
              label: t('common.value'),
              value: 'value',
            }}
          />
        </S.Row>
        <FormCheckbox
          field={{
            inputType: 'checkbox',
            name: 'isPrimary',
            label: t('common.primary'),
          }}
          checked={isChecked('isPrimary', modified, initialValues, values)}
        />
        <DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button color="primary" disabled={isFormDisabled} type="submit">{t('common.save')}</Button>
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

UserForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  types: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserForm);
