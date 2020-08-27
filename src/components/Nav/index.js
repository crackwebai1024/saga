import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as appActions } from 'redux/app';

import SuperAdminNav from './SuperAdmin';
import AdminNav from './Admin';
import ManagerNav from './Manager';
import ViewerNav from './Viewer';

import * as S from './styled';

class Nav extends React.Component {
  static propTypes = {
    role: PropTypes.string.isRequired,
    allowedCountries: PropTypes.array.isRequired,
    hasAllCountriesAccess: PropTypes.bool.isRequired,
    actions: PropTypes.shape({
      closeDrawerMenu: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    activePathKey: '', // eslint-disable-line react/no-unused-state
    toggleState: {},
  };

  handleItemToggle = (key) => {
    this.setState((state) => {
      const toggleState = { ...state.toggleState };
      toggleState[key] = !toggleState[key];

      return {
        toggleState,
      };
    });
  };

  handleItemClick = (key) => {
    this.setState({
      activePathKey: key, // eslint-disable-line react/no-unused-state
    });
    this.props.actions.closeDrawerMenu();
  };

  isActive = (path) => {
    const reg = new RegExp(`${path}(/.*)?$`);
    return reg.test(window.location.pathname);
  }

  getNav = () => {
    const {
      toggleState,
    } = this.state;

    const {
      role,
      allowedCountries,
      hasAllCountriesAccess,
    } = this.props;

    const navProps = {
      toggleState,
      onItemToggle: this.handleItemToggle,
      onItemClick: this.handleItemClick,
      isActiveLink: this.isActive,
    };

    switch (role) {
      case 'super_admin':
        return <SuperAdminNav navProps={navProps} />;
      case 'admin':
        return (
          <AdminNav
            navProps={navProps}
            isAccessToAllCountries={hasAllCountriesAccess}
            allowedCountries={allowedCountries}
          />
        );
      case 'manager':
        return (
          <ManagerNav
            navProps={navProps}
            isAccessToAllCountries={hasAllCountriesAccess}
            allowedCountries={allowedCountries}
          />
        );
      case 'viewer':
      default:
        return (
          <ViewerNav
            navProps={navProps}
            isAccessToAllCountries={hasAllCountriesAccess}
            allowedCountries={allowedCountries}
          />
        );
    }
  };

  render() {
    return (
      <S.StyledList>
        {this.getNav()}
      </S.StyledList>
    );
  }
}

const mapStateToProps = ({
  auth: {
    user: {
      role,
    },
  },
  countries: {
    allowedList,
    hasAllCountriesAccess,
  },
}) => ({
  role,
  allowedCountries: allowedList,
  hasAllCountriesAccess,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...appActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
