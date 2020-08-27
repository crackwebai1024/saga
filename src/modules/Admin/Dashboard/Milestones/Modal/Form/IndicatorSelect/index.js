import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';

import * as S from './styled';

const FormSelect = ({ field, ...rest }) => (
  <Field name={field.value}>
    {({ input, meta }) => (
      <S.FormControlSelect variant="standard" error={!!(meta.touched && meta.error)}>
        <InputLabel
          htmlFor={`standard ${field.value} select`}
        >
          {field.label}
        </InputLabel>
        <Select
          {...rest}
          {...input}
        >
          {field.options.map((option, index) => (
            option.type === 'section'
              ? <S.SectionItem disabled key={index}>{option.name}</S.SectionItem>
              : <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
      </S.FormControlSelect>
    )}
  </Field>
);

FormSelect.propTypes = {
  field: PropTypes.object.isRequired,
};

export default FormSelect;
