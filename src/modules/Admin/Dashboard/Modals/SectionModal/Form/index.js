import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import FormField from 'components/FormField';

import { validate } from './validation';

import * as S from './styled';

const SectionForm = ({
  isFormDisabled,
  onSubmit,
  initialValues,
  onClose,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values)}
    initialValues={initialValues}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <S.Row>
          <FormField
            field={{
              inputType: 'text',
              label: t('manageDashboard.section_name'),
              value: 'title',
            }}
            inputProps={{
              maxLength: 60,
            }}
          />
        </S.Row>
        <DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button color="primary" disabled={isFormDisabled} type="submit">{t('common.save')}</Button>
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

SectionForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SectionForm);
