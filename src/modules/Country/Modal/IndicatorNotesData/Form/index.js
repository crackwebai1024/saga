import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import { Button } from 'components/material';
import FormActions from '../FormActions';
import FormField from '../TextField';
import validate from './validation';
import { formFields } from './config';

import * as S from './styled';

const IndicatorNotesForm = ({
  onSubmit,
  onClose,
  initialValues,
  isEditableMode,
  switchToEditableMode,
  hasAccessToNotesUpdate,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    initialValues={initialValues}
    validate={(values) => validate(values)}
    render={({
      handleSubmit,
    }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        {formFields.map(({ label, value, inputType }) => (
          <S.Row>
            <S.Column>
              <S.Label>{label}</S.Label>
              <FormField
                field={{
                  inputType,
                  label,
                  value,
                }}
                maxTextLength={600}
                disabled={!isEditableMode}
              />
            </S.Column>
          </S.Row>
        ))}
        <S.DialogActions>
          <Button color="primary" onClick={onClose}>{t('common.close')}</Button>
          {hasAccessToNotesUpdate && (
          <FormActions
            isEditableMode={isEditableMode}
            switchToEditableMode={switchToEditableMode}
          />
          )}
        </S.DialogActions>
      </S.FormContentContainer>
    )}
  />
);

IndicatorNotesForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  switchToEditableMode: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isEditableMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  hasAccessToNotesUpdate: PropTypes.bool.isRequired,
};

export default withTranslation()(IndicatorNotesForm);
