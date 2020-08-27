import React from 'react';
import PropTypes from 'prop-types';

import { STATUSES } from 'helpers/statuses';

import * as S from './styled';

const Score = ({
  value,
  size,
  display,
}) => {
  if (!STATUSES[value]) {
    return null;
  }

  return <S.Icon display={display} img={STATUSES[value].icon} size={size} />;
};

Score.propTypes = {
  value: PropTypes.string,
  size: PropTypes.number,
  display: PropTypes.string,
};

Score.defaultProps = {
  value: '',
  display: 'block',
  size: 40,
};

export default Score;
