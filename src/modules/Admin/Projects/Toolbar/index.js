import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation } from 'react-i18next';

import CountrySelector from '../CountrySelector';
import * as S from './styled';

const EnhancedTableToolbar = ({
  countriesList,
  selectedCountry,
  handleSelectCountry,
  onAdd,
  t,
}) => (
  <S.StyledToolbar>
    <CountrySelector
      options={countriesList}
      selectedOption={selectedCountry}
      onSelect={handleSelectCountry}
    />
    <Tooltip title={t('admin.new_project')}>
      <S.StyledButton aria-label={t('admin.new_project')} color="primary" onClick={onAdd}>
        {t('admin.new_project')}
      </S.StyledButton>
    </Tooltip>
  </S.StyledToolbar>
);

EnhancedTableToolbar.propTypes = {
  countriesList: PropTypes.array.isRequired,
  selectedCountry: PropTypes.number,
  handleSelectCountry: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

EnhancedTableToolbar.defaultProps = {
  selectedCountry: undefined,
};

export default withTranslation()(EnhancedTableToolbar);
