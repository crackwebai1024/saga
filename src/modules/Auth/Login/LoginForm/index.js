import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import FormField from 'components/FormField';
import * as S from './styled';

const LoginForm = ({
  error,
  fields,
  isLoading,
  onSubmit,
  validate,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <h2>{t('common.login')}</h2>
        {fields.map((field) => (
          <FormField field={field} key={field.value} t={t} />
        ))}
        <S.Actions>
          <S.Link to="/forgot-password">{t('common.forgot_password')}</S.Link>
          <S.SmallButton variant="contained" color="primary" disabled={isLoading} type="submit">
            {t('common.login')}
          </S.SmallButton>
        </S.Actions>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.FormContentContainer>
    )}
  />
);

LoginForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};
LoginForm.defaultProps = {
  error: '',
  isLoading: false,
};

export default withTranslation()(LoginForm);
