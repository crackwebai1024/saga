import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

import Switch from '@material-ui/core/Switch/Switch';

import * as S from './styled';

const FormSwitch = ({ field }) => (
  <Field name={field.value} type="checkbox">
    {({ input }) => (
      <S.Label
        control={(
          <Switch
            {...input}
            color="primary"
          />
        )}
        label={field.label}
      />
    )}
  </Field>
);

FormSwitch.propTypes = {
  field: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  }).isRequired,
};

export default FormSwitch;
