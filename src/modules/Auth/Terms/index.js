import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import AgreementText from './AgreementText';
import PrivacyPolicy from './PrivacyPolicy';

import * as S from './styled';

const Terms = ({ match: { params: { type } }, t }) => (
  <S.Container>
    <S.Header>
      <S.LinkContainer isselected={(type === 'agreement').toString()}>
        <S.StyledLink isselected={(type === 'agreement').toString()} to="agreement">
          {t('common.license_agreement')} (&quot;Agreement&quot;)
        </S.StyledLink>
      </S.LinkContainer>
      <S.LinkContainer isselected={(type === 'policy').toString()}>
        <S.StyledLink isselected={(type === 'policy').toString()} to="policy">
          {t('common.privacy_policy')}
        </S.StyledLink>
      </S.LinkContainer>
    </S.Header>
    <S.Body>
      {
        type === 'agreement' ? <AgreementText /> : <PrivacyPolicy />
      }
    </S.Body>
  </S.Container>
);

Terms.propTypes = {
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Terms);
