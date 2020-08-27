import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const Select = ({
  title,
  name,
  items,
  selected,
  onChange,
  fullWidth,
  itemValue,
  itemName,
  defaultItem,
  disabled,
}) => (
  <S.Wrapper>
    <S.InputLabel htmlFor={`select-${name}`}>{title}</S.InputLabel>
    <S.Select
      disabled={disabled}
      // multiple={Array.isArray(selected)}
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      input={<S.Input id={`select-${name}`} />}
      fullWidth={fullWidth}
    >
      {defaultItem
        ? (
          <S.MenuItem value={itemValue ? defaultItem[itemValue] : defaultItem}>
            {itemName ? defaultItem[itemName] : defaultItem}
          </S.MenuItem>
        )
        : null}
      {items.map((item, index) => (
        <S.MenuItem key={index} value={itemValue ? item[itemValue] : item}>
          {itemName ? item[itemName] : item}
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
  fullWidth: PropTypes.bool,
  defaultItem: PropTypes.object,
  itemValue: PropTypes.string,
  itemName: PropTypes.string,
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  fullWidth: true,
  defaultItem: null,
  itemValue: null,
  itemName: null,
  disabled: false,
};

export default Select;
