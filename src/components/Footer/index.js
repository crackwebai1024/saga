import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { FOOTER_LINKS } from './config';

import * as S from './styled';

const Footer = ({ t }) => (
  <S.Wrapper>
    <S.Container>
      <S.Logo />
      <S.TextContainer>
        <S.TextPrimary>
          &copy; Delivery Associates
          {FOOTER_LINKS.map(({ text, href, target }, index) => (
            <S.LinkContainer key={index}>
              <S.StyledLink href={href} target={target}>{text}</S.StyledLink>
            </S.LinkContainer>
          ))}
          <br />
          727-729 High Road, North Finchley, London, N12 OBP
        </S.TextPrimary>
        <S.TextSecondary>
          DELIVEROLOGY
          <sup>&reg;</sup> {t('common.is_a_registered')}.
        </S.TextSecondary>
      </S.TextContainer>
    </S.Container>
  </S.Wrapper>
);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Footer);
