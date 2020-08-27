import React from 'react';
import PropTypes from 'prop-types';

import ArrowBack from '@material-ui/icons/ArrowBack';

import * as S from './styled';

const Header = ({ title, onClickBack }) => (
  <S.Wrapper>
    <S.BackLink onClick={onClickBack}>
      <ArrowBack />
      <S.TitleWrapper>
        {title}
      </S.TitleWrapper>
    </S.BackLink>
  </S.Wrapper>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onClickBack: PropTypes.func.isRequired,
};

export default Header;
