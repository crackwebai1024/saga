import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const FormCheckbox = ({
  checked,
  disabled,
  field,
  onChange,
}) => {
  const handleChange = (value, input) => {
    input.onChange(value);

    if (onChange) {
      onChange(input);
    }
  };

  return (
    <Field
      key={field.value}
      name={field.name}
      type={field.inputType}
      value={field.value}
      render={({ input, meta, ...rest }) => (
        <FormControlLabel
          control={(
            <Checkbox
              {...input}
              {...rest}
              onChange={(value) => handleChange(value, input)}
              disabled={disabled}
              checked={checked}
            />
          )}
          label={field.label}
        />
      )}
    />
  );
};

FormCheckbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  field: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

FormCheckbox.defaultProps = {
  onChange: null,
};

export default FormCheckbox;
