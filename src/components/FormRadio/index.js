import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import {
  FormLabel,
  FormControlLabel,
} from '@material-ui/core';

import Radio from './Radio';
import * as S from './styled';

// to use some preset(default) value for radio button need to set it explicitly in form initialValues.
// In case when form field value is null(e.g. comes from server)
const FormRadio = ({
  field,
  items,
  disabled,
}) => (
  <S.Wrapper>
    <FormLabel component="legend">{field.label}</FormLabel>
    {items.map((item) => (
      <Field
        key={item.value}
        name={field.name}
        value={item.value}
        type="radio"
        render={({
          input,
          meta,
        }) => (
          <FormControlLabel
            label={item.name}
            control={<Radio input={input} meta={meta} />}
            disabled={disabled}
          />
        )}
      />
    ))}

  </S.Wrapper>
);

FormRadio.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    fallbackInitialValue: PropTypes.string,
  }).isRequired,
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default FormRadio;
