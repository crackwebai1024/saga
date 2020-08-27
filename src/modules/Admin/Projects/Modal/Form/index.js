import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import FormField from 'components/FormField';

import { validate } from './validation';

import * as S from './styled';

const ProjectForm = ({
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
    render={({ handleSubmit, dirty }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <FormField
          field={{
            inputType: 'text',
            label: 'Project',
            value: 'name',
          }}
          inputProps={{
            min: 1,
          }}
        />
        <DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button color="primary" disabled={isFormDisabled || !dirty} type="submit">
            {t('common.save')}
          </Button>
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

ProjectForm.propTypes = {
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ProjectForm);
