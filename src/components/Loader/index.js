import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLoaderState } from 'redux/loader/selectors';

import * as S from './styled';

const Loader = ({
  isOpen,
}) => (
  <S.Modal open={isOpen}>
    <S.Wrapper>
      <S.CircularProgress />
    </S.Wrapper>
  </S.Modal>
);

Loader.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: getLoaderState(state),
});

export default connect(mapStateToProps)(Loader);
