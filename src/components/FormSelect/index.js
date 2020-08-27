import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import InputLabel from '@material-ui/core/InputLabel';

import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import * as S from './styled';

const FormSelect = ({ field, small, ...rest }) => (
  <Field name={field.value}>
    {({ input, meta }) => (
      <S.FormControlSelect small={small ? 'yes' : 'no'} variant="standard" error={!!(meta.touched && meta.error)}>
        <InputLabel
          htmlFor={`standard ${field.value} select`}
        >
          {field.label}
        </InputLabel>
        <S.StyledSelect
          disabled={field.disabled}
          {...rest}
          {...input}
        >
          {field.options.map((option, index) => (
            typeof option === 'string'
              ? <MenuItem key={index} value={option}>{option}</MenuItem>
              : <MenuItem key={index} value={option.value}>{option.name}</MenuItem>
          ))}
        </S.StyledSelect>
        {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
      </S.FormControlSelect>
    )}
  </Field>
);

FormSelect.propTypes = {
  field: PropTypes.object.isRequired,
  small: PropTypes.bool,
};

FormSelect.defaultProps = {
  small: false,
};

export default FormSelect;
