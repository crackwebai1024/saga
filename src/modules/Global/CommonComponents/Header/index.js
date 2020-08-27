import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Menu as MenuIcon } from '@material-ui/icons';

import SelectLanguage from 'components/SelectLanguage';
import CountryDropdown from 'components/CountryDropdown';
import { actions as appActions } from 'redux/app';
import logo from 'images/ifad-no-text@2x.png';

import * as S from './styled';

class Header extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  handleDrawerOpen = () => {
    this.props.actions.openDrawerMenu();
  };

  render() {
    return (
      <S.StyledAppBar position="static">
        <S.StyledToolbar>
          <S.LeftSideContent>
            <Link to="/">
              <S.StyledLogo src={logo} alt="Logo" />
            </Link>
            <CountryDropdown global />
          </S.LeftSideContent>
          <S.RightSideContent>
            <SelectLanguage country={false} />
            <S.StyledIconButton
              edge="start"
              color="inherit"
              aria-label="Menu"
              onClick={this.handleDrawerOpen}
            >
              <MenuIcon />
            </S.StyledIconButton>
          </S.RightSideContent>
        </S.StyledToolbar>
      </S.StyledAppBar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...appActions,
    },
    dispatch,
  ),
});

export default withTranslation()(connect(
  null,
  mapDispatchToProps,
)(Header));
