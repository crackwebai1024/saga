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
  <div>
    <S.InputLabel htmlFor={`select-${name}`}>{title}</S.InputLabel>
    <S.Select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      input={<S.Input id={`select-${name}`} />}
    >
      {items && items.map((item) => (
        <S.MenuItem key={item.id} value={item}>
          {item.name}
        </S.MenuItem>
      ))}
    </S.Select>
  </div>
);

Select.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
