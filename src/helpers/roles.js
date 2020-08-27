export const userRoles = ['super_admin', 'admin', 'manager', 'viewer'];

export const showedUserRoleMap = {
  super_admin: 'SuperAdmin',
  admin: 'Admin',
  manager: 'Manager',
  viewer: 'Viewer',
};

export const filterRoles = (role, rolesMap) => Object.keys(rolesMap)
  .filter((roleItem) => (role === 'super_admin' ? true : roleItem !== 'super_admin'));
