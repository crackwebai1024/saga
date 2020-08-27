import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import * as S from './styled';

const TextField = ({
  field,
  maxTextLength,
  disabled,
  ...rest
}) => (
  <Field
    name={field.value}
  >
    {({ input, meta }) => (
      <>
        <S.MaterialTextField
          {...input}
          multiline
          maxLength={maxTextLength}
          rows={field.title ? 1 : 2}
          placeholder={disabled ? 'No data' : 'Type text...'}
          type={field.inputType}
          onKeyDown={(e) => {
            if (field.inputType === 'number' && (e.keyCode === 69 || e.keyCode === 188)) {
              e.preventDefault();
            }
          }}
          disabled={disabled}
          {...rest}
        />
        {meta.touched && meta.error
          && <S.FormHelperText error>{meta.error}</S.FormHelperText>}
      </>
    )}
  </Field>
);

TextField.propTypes = {
  field: PropTypes.shape({
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    title: PropTypes.bool,
  }).isRequired,
  maxTextLength: PropTypes.number,
  disabled: PropTypes.bool,
};

TextField.defaultProps = {
  maxTextLength: null,
  disabled: false,
};

export default TextField;
