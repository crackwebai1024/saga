import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import * as S from './styled';

import defaultLimits from './limits';

const textFormat = (value) => (value ? value.trim() : '');

const FormField = ({
  field,
  parse,
  variant,
  inputProps,
  t,
  ...rest
}) => (
  <Field
    name={field.value}
    parse={parse}
    formatOnBlur={field.inputType === 'text'}
    format={field.inputType === 'text' ? (field.format || textFormat) : undefined}
    initialValue={field.initialValue}
  >
    {({ input, meta }) => (
      <S.TextField
        {...input}
        label={(t && field.i18n) ? t(field.i18n) : field.label}
        margin="none"
        placeholder={field.placeholder}
        variant={variant}
        type={field.inputType}
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched && meta.error ? meta.error : null}
        onKeyDown={(e) => {
          if (field.inputType === 'number' && (e.keyCode === 69 || e.keyCode === 188)) {
            e.preventDefault();
          }
        }}
        inputProps={{ ...defaultLimits[field.inputType], ...inputProps }}
        {...rest}
      />
    )}
  </Field>
);

FormField.defaultProps = {
  parse: undefined,
  variant: 'standard',
  inputProps: {},
  t: undefined,
};

FormField.propTypes = {
  field: PropTypes.shape({
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    inputType: PropTypes.string,
    format: PropTypes.func,
    initialValue: PropTypes.object,
    i18n: PropTypes.string,
  }).isRequired,
  parse: PropTypes.func,
  variant: PropTypes.string,
  inputProps: PropTypes.object,
  t: PropTypes.func,
};

export default FormField;
