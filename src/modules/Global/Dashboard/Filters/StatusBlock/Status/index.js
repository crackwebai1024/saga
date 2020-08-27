import React from 'react';
import PropTypes from 'prop-types';

import Score from 'components/Score';

import * as S from './styled';

const Status = ({
  name,
  isSelected,
  onSelect,
}) => (
  <S.Wrapper>
    <S.IconButton aria-label="Status" isSelected={isSelected} onClick={() => onSelect(name)}>
      <Score value={name} size={28} />
    </S.IconButton>
  </S.Wrapper>
);

Status.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Status;
