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
  <>
    <S.InputLabel htmlFor={`select-${name}`}>{title}</S.InputLabel>
    <S.Select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      input={<S.Input id={`select-${name}`} />}
    >
      {items.map((item) => (
        <S.MenuItem key={item.key} value={item.key}>
          {item.text}
        </S.MenuItem>
      ))}
    </S.Select>
  </>
);

Select.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
