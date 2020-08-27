import { createSelector } from 'reselect';

export const getIndicators = createSelector(
  [
    (country) => country.details,
  ],
  (details) => {
    const indicatorGroups = details.sections.reduce((arr, section) => [
      ...arr,
      ...section.indicatorGroups,
    ], []);
    const indicatorsList = indicatorGroups.reduce((arr, group) => [
      ...arr,
      ...group.indicators,
    ], []);

    return indicatorsList;
  },
);

export const checkAccessToImport = createSelector(
  [(auth) => auth.user.role],
  (role) => [
    'super_admin',
    'admin',
    'manager',
  ].includes(role),
);
