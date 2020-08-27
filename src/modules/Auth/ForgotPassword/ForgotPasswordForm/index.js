import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-final-form';

import FormField from 'components/FormField';
import * as S from './styled';

const ForgotPasswordForm = ({
  error,
  fields,
  isLoading,
  onSubmit,
  validate,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values, validate)}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <h2>{t('common.forgot_password')}</h2>
        {fields.map((field) => (
          <FormField field={field} key={field.value} />
        ))}
        <S.SmallButton variant="contained" color="primary" disabled={isLoading} type="submit">
          {t('common.submit')}
        </S.SmallButton>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.FormContentContainer>
    )}
  />
);

ForgotPasswordForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
ForgotPasswordForm.defaultProps = {
  error: '',
  isLoading: false,
};

export default withTranslation()(ForgotPasswordForm);
