import React from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

import Footer from 'components/Footer';
import Drawer from 'components/Drawer';

import Header from './Header';
import CountryRoutes from './Routes';

import * as S from './styled';

const Country = (props) => (
  <S.Wrapper>
    <S.Container>
      <Header countrySlug={String(props.location.pathname).split('/')[2]} />
      <Drawer anchor="right" />
      <S.Content>
        <CountryRoutes />
      </S.Content>
      <Footer />
    </S.Container>
  </S.Wrapper>
);

Country.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withSnackbar(Country);
