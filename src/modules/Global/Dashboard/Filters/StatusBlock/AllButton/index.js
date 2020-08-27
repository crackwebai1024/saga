import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import * as S from './styled';

const AllButton = ({
  onClick,
  t,
}) => (
  <S.Button
    onClick={onClick}
  >
    {t('common.all')}
  </S.Button>
);

AllButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(AllButton);
