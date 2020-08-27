import React from 'react';
import PropTypes from 'prop-types';

import FormLabel from '@material-ui/core/FormLabel';

import * as S from './styled';

const CheckboxGroup = ({
  label,
  children,
  error,
}) => (
  <S.Wrapper>
    <FormLabel error={!!error} component="legend">{label}</FormLabel>
    <S.Row>
      {children}
    </S.Row>
    <S.FormHelperText
      error={!!error}
    >
      {error}
    </S.FormHelperText>
  </S.Wrapper>
);

CheckboxGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.array.isRequired,
  error: PropTypes.string,
};

CheckboxGroup.defaultProps = {
  error: '',
};

export default CheckboxGroup;
