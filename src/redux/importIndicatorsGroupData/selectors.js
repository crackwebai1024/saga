import { createSelector } from 'reselect';

export const checkAccessToImport = createSelector(
  [(auth) => auth.user.role],
  (role) => [
    'super_admin',
    'admin',
    'manager',
  ].includes(role),
);

export const blank = () => {};
