import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import { actions as authActions } from 'redux/auth';
import { actions as appActions } from 'redux/app';
import { AccountCircle, Close as CloseIcon } from '@material-ui/icons';

import Nav from 'components/Nav';
import * as S from './styled';

function DrawerComponent(props) {
  const {
    drawerOpen,
    actions,
    anchor,
    user,
    t,
  } = props;

  const onClose = () => {
    actions.closeDrawerMenu();
    actions.logoutRequest();
  };

  return (
    <S.StyledDrawer open={drawerOpen} onClose={actions.closeDrawerMenu} anchor={anchor || 'left'}>
      <S.StyledUserDiv>
        <AccountCircle />
        <S.StyledIconButton aria-label="close" onClick={() => actions.closeDrawerMenu()}>
          <CloseIcon />
        </S.StyledIconButton>
        <S.StyledItem>
          { user.email }
        </S.StyledItem>
        <S.StyledLink href="" onClick={onClose}>
          { t('common.logout') }
        </S.StyledLink>
      </S.StyledUserDiv>
      <Nav />
    </S.StyledDrawer>
  );
}

DrawerComponent.propTypes = {
  user: PropTypes.object.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  anchor: PropTypes.string,
  t: PropTypes.func.isRequired,
};
DrawerComponent.defaultProps = {
  anchor: 'left',
};

const mapStateToProps = ({
  auth: {
    user,
  },
  app: {
    drawerOpen,
  },
}) => ({
  drawerOpen,
  user,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
    ...appActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(DrawerComponent));
