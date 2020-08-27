import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const ToggleButtonGroup = ({
  value,
  label,
  onChange,
  items,
  exclusive,
}) => {
  const handleButtonClick = (event, selectedValue) => {
    if (selectedValue) {
      onChange(selectedValue, event);
    }
  };

  return (
    <S.Container>
      {label ? <S.Label>{label}</S.Label> : null}
      <S.ButtonGroup
        exclusive={exclusive}
        onChange={handleButtonClick}
        value={value}
      >
        {items.map((item, index) => (
          <S.Button key={index} value={item.value}>
            {item.label}
          </S.Button>
        ))}
      </S.ButtonGroup>
    </S.Container>
  );
};

ToggleButtonGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
  ).isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  exclusive: PropTypes.bool,
};

ToggleButtonGroup.defaultProps = {
  exclusive: true,
  label: null,
};

export default ToggleButtonGroup;
