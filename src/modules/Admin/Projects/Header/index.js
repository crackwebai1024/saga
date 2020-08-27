import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Toolbar from '../Toolbar';
import * as S from './styled';

const Header = ({
  countriesList,
  selectedCountry,
  handleSelectCountry,
  onAdd,
  t,
}) => (
  <S.Wrapper>
    <S.Title>
      {t('admin.manage_projects')}
    </S.Title>
    <Toolbar
      countriesList={countriesList}
      selectedCountry={selectedCountry}
      handleSelectCountry={handleSelectCountry}
      onAdd={onAdd}
    />
  </S.Wrapper>
);

Header.propTypes = {
  countriesList: PropTypes.array.isRequired,
  selectedCountry: PropTypes.number,
  handleSelectCountry: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Header.defaultProps = {
  selectedCountry: undefined,
};

export default withTranslation()(Header);
