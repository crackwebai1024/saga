import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as S from './styled';

const CountrySelector = ({
  options,
  selectedOption,
  onSelect,
  t,
}) => (
  <S.FormControlSelect>
    <InputLabel htmlFor="country">{t('manageDashboard.country')}</InputLabel>
    <Select
      value={selectedOption}
      onChange={onSelect}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
      ))}
    </Select>
  </S.FormControlSelect>
);

CountrySelector.propTypes = {
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

CountrySelector.defaultProps = {
  selectedOption: undefined,
};

export default withTranslation()(CountrySelector);
