import { createSelector } from 'reselect';

export const checkAccessToNotesUpdate = createSelector(
  [(auth) => auth.user.role],
  (role) => [
    'super_admin',
    'admin',
    'manager',
  ].includes(role),
);

export default checkAccessToNotesUpdate;
