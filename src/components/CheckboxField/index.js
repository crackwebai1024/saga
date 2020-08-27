import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CheckboxField = ({ className, color, field }) => (
  <Field name={field.value} type="checkbox">
    {({ input: { checked, name, onChange }, meta, ...rest }) => (
      <FormControlLabel
        className={className}
        control={(
          <Checkbox
            {...rest}
            checked={checked}
            color={color}
            name={name}
            onChange={onChange}
          />
        )}
        label={field.label}
      />
    )}
  </Field>
);

CheckboxField.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  field: PropTypes.object.isRequired,
};

CheckboxField.defaultProps = {
  className: '',
  color: 'primary',
};

export default CheckboxField;
