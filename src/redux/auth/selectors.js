import { createSelector } from 'reselect';

export const getCitySelectorOptions = createSelector(
  [(cities) => cities],
  (cities) => ((cities && cities.length) ? cities.slice(1).map(({ id, name }) => ({ label: name, value: id })) : []),
);

export const blank = () => {};
