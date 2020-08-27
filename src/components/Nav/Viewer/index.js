import React from 'react';
import PropTypes from 'prop-types';

import MenuLink from '../MenuLink';
import MenuItemCollapsible from '../MenuItemCollapsible';

function Viewer(props) {
  const {
    navProps,
    allowedCountries,
    isAccessToAllCountries,
  } = props;

  return (
    <>
      {isAccessToAllCountries
        ? (
          <MenuLink
            {...navProps}
            label="Global dashboard"
            path="/global"
            keyItem="globalDashboard"
          />
        )
        : null}
      <MenuItemCollapsible
        {...navProps}
        label="Country Dashboard"
        keyItem="countryDashboard"
        items={allowedCountries.map((country) => ({
          label: country.name,
          path: `/country/${country.slug}`,
          keyItem: country.slug,
        }))}
      />
    </>
  );
}

Viewer.propTypes = {
  navProps: PropTypes.object.isRequired,
  allowedCountries: PropTypes.array.isRequired,
  isAccessToAllCountries: PropTypes.bool.isRequired,
};

export default Viewer;
