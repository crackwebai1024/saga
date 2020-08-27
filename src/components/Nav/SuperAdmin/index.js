import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import MenuLink from '../MenuLink';
// import MenuItemCollapsible from '../MenuItemCollapsible';

function SuperAdminNav(props) {
  const {
    navProps,
    t,
  } = props;

  return (
    <>
      <MenuLink
        {...navProps}
        label={t('global.global_dashboard')}
        path="/global"
        keyItem="globalDashboard"
      />
      {/* <MenuItemCollapsible
        {...navProps}
        label={t('admin.country_dashboard')}
        keyItem="countryDashboard"
        items={allowedCountries.map((country) => ({
          label: country.name,
          path: `/country/${country.slug}`,
          keyItem: country.slug,
        }))}
      /> */}
      <MenuLink
        {...navProps}
        label={t('admin.manage_countries')}
        path="/admin/countries"
        keyItem="manageCountries"
      />
      <MenuLink
        {...navProps}
        label={t('admin.manage_projects')}
        path="/admin/projects"
        keyItem="manageSections"
      />
      <MenuLink
        {...navProps}
        label={t('admin.manage_users')}
        path="/admin/users"
        keyItem="manageUsers"
      />
    </>
  );
}

SuperAdminNav.propTypes = {
  navProps: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SuperAdminNav);
