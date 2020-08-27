import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import FormHelperText from '@material-ui/core/FormHelperText';
import MaterialTextField from '@material-ui/core/TextField/TextField';

const TextField = ({
  field,
  maxTextLength,
  ...rest
}) => {
  /* eslint-disable react/prop-types */
  const renderHelperText = ({ inputLength, meta }) => {
    if (maxTextLength) {
      const isError = (inputLength > maxTextLength) || (meta.touched && meta.error);

      return (
        <FormHelperText error={isError}>
          {inputLength}/{maxTextLength}{isError ? `. ${meta.error}` : ''}
        </FormHelperText>
      );
    }

    return meta.touched && meta.error
      ? <FormHelperText error>{meta.error}</FormHelperText>
      : null;
  };
  /* eslint-enable react/prop-types */

  return (
    <Field
      name={field.value}
    >
      {({ input, meta }) => (
        <>
          <MaterialTextField
            {...input}
            multiline
            maxLength={1000}
            rows={7}
            placeholder="Type text..."
            variant="outlined"
            type={field.inputType}
            onKeyDown={(e) => {
              if (field.inputType === 'number' && (e.keyCode === 69 || e.keyCode === 188)) {
                e.preventDefault();
              }
            }}
            {...rest}
          />
          {renderHelperText({ inputLength: input.value.length, meta })}
        </>
      )}
    </Field>
  );
};

TextField.propTypes = {
  field: PropTypes.shape({
    inputType: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
  }).isRequired,
  maxTextLength: PropTypes.number,
};

TextField.defaultProps = {
  maxTextLength: null,
};

export default TextField;
