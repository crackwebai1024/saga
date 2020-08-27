import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';

import FormField from 'components/FormField';
import * as S from './styled';

// eslint-disable-next-line max-len
const TERMS_OF_USE_1 = 'By registering an account or using Delivery Associates Digital products, I confirm that I have read, understood and agree to our ';
const TERMS_OF_USE_2 = 'and the use of cookies.';

const ResetPasswordForm = ({
  error,
  fields,
  isLoading,
  onSubmit,
  validate,
  action,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    render={({ handleSubmit, values }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <h2>{action} Password</h2>
        {fields.map((field) => (
          <FormField field={field} key={field.value} />
        ))}
        {
          action === 'Set' && (
            <S.CheckboxContainer>
              <S.Checkbox field={{ value: 'termsCheckbox' }} />
              <S.Label>
                {TERMS_OF_USE_1}
                <S.StyledLink target="_blank" to="/terms/agreement">User Agreement</S.StyledLink>,
                <S.StyledLink target="_blank" to="/terms/policy"> Privacy policy </S.StyledLink>
                {TERMS_OF_USE_2}
              </S.Label>
            </S.CheckboxContainer>
          )
        }
        <S.SmallButton
          variant="contained"
          color="primary"
          disabled={isLoading
            || (action === 'Set' && !values.termsCheckbox)}
          type="submit"
        >
          Submit
        </S.SmallButton>
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.FormContentContainer>
    )}
  />
);

ResetPasswordForm.propTypes = {
  error: PropTypes.string,
  fields: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  validate: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
};
ResetPasswordForm.defaultProps = {
  error: '',
  isLoading: false,
};

export default ResetPasswordForm;
