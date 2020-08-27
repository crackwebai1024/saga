import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const Select = ({
  title,
  name,
  items,
  selected,
  onChange,
}) => (
  <S.Wrapper>
    <S.InputLabel htmlFor={`select-${name}`}>{title}</S.InputLabel>
    <S.Select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      input={<S.Input id={`select-${name}`} />}
    >
      {items.map((item) => (
        <S.MenuItem key={item.key} value={item.key}>
          {item.name}
        </S.MenuItem>
      ))}
    </S.Select>
  </S.Wrapper>
);

Select.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};


export default Select;
