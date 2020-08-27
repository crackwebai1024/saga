import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { InlineDatePicker } from 'material-ui-pickers';

import { withStyles } from '@material-ui/core';

import styles from './material.styled';

const FormDatePicker = ({
  classes,
  className,
  field,
  maxDate,
  minDate,
}) => (
  <Field name={field.value}>
    {({ input, meta }) => (
      <InlineDatePicker
        className={className || classes.dateField}
        error={!!(meta.touched && meta.error)}
        format={field.format}
        helperText={meta.touched && meta.error ? meta.error : null}
        label={field.label}
        maxDate={maxDate}
        minDate={minDate}
        variant="outlined"
        {...input}
      />
    )}
  </Field>
);

FormDatePicker.defaultProps = {
  className: '',
  maxDate: new Date(2200, 0),
  minDate: new Date(1900, 0),
  field: {
    format: 'DD MMMM YYYY',
  },
};

FormDatePicker.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  field: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    format: PropTypes.string,
  }),
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
};

export default withStyles(styles)(FormDatePicker);
