const MANAGE_COUNTRIES = {
  label: 'admin.manage_countries',
  path: '/admin/countries',
  keyItem: 'manageCountries',
};

const MANAGE_USERS = {
  label: 'admin.manage_users',
  path: '/admin/users',
  keyItem: 'manageUsers',
};

const MANAGE_PROJECTS = {
  label: 'admin.manage_projects',
  path: '/admin/projects',
  keyItem: 'manageSections',
};

const getMenuItems = (role) => {
  switch (role) {
    case 'super_admin': {
      return [
        MANAGE_COUNTRIES,
        MANAGE_USERS,
        MANAGE_PROJECTS,
      ];
    }
    case 'admin': {
      return [
        MANAGE_USERS,
        MANAGE_PROJECTS,
      ];
    }
    default: {
      return [];
    }
  }
};

const updateLinkToLogPage = (link) => {
  const linkArray = link.split('/report');
  return `${linkArray[0]}/update-log`;
};

module.exports = {
  getMenuItems,
  updateLinkToLogPage,
};
