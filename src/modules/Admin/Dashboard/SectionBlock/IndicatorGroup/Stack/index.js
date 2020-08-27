import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const Stack = ({ children, dynamicColor }) => (
  <S.StackWrapper>
    <S.Stack>
      <S.StackItem elevation={2} dynamicColor={dynamicColor} />
      <S.StackItem elevation={4} dynamicColor={dynamicColor} />
    </S.Stack>
    {children}
  </S.StackWrapper>
);

Stack.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  dynamicColor: PropTypes.bool,
};

Stack.defaultProps = {
  dynamicColor: false,
};

export default Stack;
