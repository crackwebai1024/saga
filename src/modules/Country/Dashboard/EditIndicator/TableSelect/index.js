import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const Select = ({
  name,
  items,
  selected,
  onChange,
}) => (
  <S.Select
    value={selected}
    onChange={(e) => onChange(e.target.value)}
    input={<S.Input id={`select-${name}`} />}
  >
    {items.map((item) => (
      <S.MenuItem key={item.id} value={item.id}>
        {item.name}
      </S.MenuItem>
    ))}
  </S.Select>
);

Select.propTypes = {
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
