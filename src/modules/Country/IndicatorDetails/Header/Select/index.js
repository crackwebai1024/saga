import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import * as S from './styled';

const Select = ({
  title,
  name,
  items,
  selected,
  onChange,
  t,
}) => (
  <>
    <S.InputLabel htmlFor={`select-${name}`}>{title}</S.InputLabel>
    <S.Select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      input={<S.Input id={`select-${name}`} />}
    >
      {items && items.map((item) => (
        <S.MenuItem key={item} value={item}>
          {t(`country.filter.${item}`)}
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
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Select);
