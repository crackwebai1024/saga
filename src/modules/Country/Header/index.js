import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';

import { Settings, Menu as MenuIcon } from '@material-ui/icons';

import { actions as authActions } from 'redux/auth';
import { actions as appActions } from 'redux/app';

import SelectLanguage from 'components/SelectLanguage';
import CountryDropdown from 'components/CountryDropdown';
import logo from 'images/ifad-no-text@2x.png';

import * as S from './styled';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    countrySlug: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  handleDrawerOpen = () => {
    this.props.actions.openDrawerMenu();
  };

  render() {
    const { user, t } = this.props;

    return (
      <S.StyledAppBar position="static">
        <S.StyledToolbar>
          <S.LeftSideContent>
            <Link to="/">
              <S.StyledLogo src={logo} alt="Logo" />
            </Link>
            <CountryDropdown currentSlug={this.props.countrySlug} />
            {user.role === 'viewer' ? null
              : (
                <S.SLinkContainer>
                  <S.SLink to={`/admin/country/${this.props.countrySlug}/projects`}>
                    <Settings />
                    <S.SText>
                      {t('admin.manage_projects')}
                    </S.SText>
                  </S.SLink>
                  <S.SLink to={`/country/${this.props.countrySlug}/country-dashboard/targets`}>
                    <Settings />
                    <S.SText>
                      {t('admin.manage_targets')}
                    </S.SText>
                  </S.SLink>
                </S.SLinkContainer>
              )}
          </S.LeftSideContent>
          <S.RightSideContent>
            <SelectLanguage country />
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

const mapStateToProps = ({
  auth: {
    user,
  },
  theme,
}) => ({
  user,
  theme,
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
