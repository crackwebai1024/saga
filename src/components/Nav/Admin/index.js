import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import MenuLink from '../MenuLink';
// import MenuItemCollapsible from '../MenuItemCollapsible';

function AdminNav(props) {
  const {
    navProps,
    // allowedCountries,
    isAccessToAllCountries,
    t,
  } = props;

  return (
    <>
      {isAccessToAllCountries
        ? (
          <MenuLink
            {...navProps}
            label={t('global.global_dashboard')}
            path="/global"
            keyItem="globalDashboard"
          />
        )
        : null}
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

AdminNav.propTypes = {
  navProps: PropTypes.object.isRequired,
  allowedCountries: PropTypes.array.isRequired,
  isAccessToAllCountries: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(AdminNav);
