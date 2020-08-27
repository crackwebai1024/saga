import React from 'react';
import PropTypes from 'prop-types';

import MuiRadio from '@material-ui/core/Radio';

/**
 * Returns field value. In case transformed boolean value to string returns boolean.
 * @param e {Object}
 * @returns {String | Boolean}
 */
const getValue = (e) => {
  const { value } = e.target;
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }

  return value;
};

const Radio = ({
  input: {
    checked,
    value,
    name,
    onChange,
    ...restInput
  },
  meta,
  ...rest
}) => (
  <MuiRadio
    {...rest}
    name={name}
    inputProps={restInput}
    onChange={(e) => onChange(getValue(e))}
    checked={checked}
    value={value}
  />
);

Radio.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object,
};

Radio.defaultProps = {
  meta: {},
};

export default Radio;
