import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { getMenuItems } from 'helpers/navigation';

import * as S from './styled';

const HeaderLinks = ({ userRole, t, withCountryFontColor }) => (
  <S.Container>
    {getMenuItems(userRole).map((item) => (
      <S.Item to={item.path} key={item.keyItem} iscountry={withCountryFontColor ? 'yes' : 'no'}>
        {t(item.label)}
      </S.Item>
    ))}
  </S.Container>
);

HeaderLinks.propTypes = {
  userRole: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  withCountryFontColor: PropTypes.bool,
};

HeaderLinks.defaultProps = {
  withCountryFontColor: false,
};

export default withTranslation()(HeaderLinks);
