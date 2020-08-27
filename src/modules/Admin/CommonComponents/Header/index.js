import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import { IconButton } from '@material-ui/core';
import { AccountCircle, Menu as MenuIcon } from '@material-ui/icons';

import Menu from 'components/Menu';
import HeaderLinks from 'components/HeaderLinks';
import SelectLanguage from 'components/SelectLanguage';
import { actions as authActions } from 'redux/auth';
import { actions as appActions } from 'redux/app';

import * as S from './styled';

class Header extends Component {
  /* eslint-disable */
  handleLogout = () => {
    this.props.actions.logoutRequest();
  };
  /* eslint-enable */

  menuItems = [
    {
      label: this.props.user.email,
    },
    {
      label: 'Logout',
      onClick: this.handleLogout,
      i18nKey: 'logout',
    },
  ];

  static propTypes = {
    user: PropTypes.object.isRequired,
    allowedList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  };

  handleDrawerOpen = () => {
    this.props.actions.openDrawerMenu();
  };

  render() {
    const { user, allowedList, t } = this.props;
    return (
      <S.StyledAppBar position="static">
        <S.StyledToolbar>
          <S.LeftSideContent>
            {allowedList.length <= 1 && !user.role.includes('admin') ? null : (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="Menu"
                onClick={this.handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            )}
            <S.StyledTypography variant="h6">{t('common.admin_panel')}</S.StyledTypography>
          </S.LeftSideContent>
          <S.RightSideContent>
            <HeaderLinks userRole={user.role} />
            <SelectLanguage country={false} />
            <Menu items={this.menuItems} IconComponent={AccountCircle} />
          </S.RightSideContent>
        </S.StyledToolbar>
      </S.StyledAppBar>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user,
  },
  countries: {
    allowedList,
  },
}) => ({
  user,
  allowedList,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
      ...appActions,
    },
    dispatch,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Header));
