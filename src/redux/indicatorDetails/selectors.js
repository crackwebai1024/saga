import { createSelector } from 'reselect';
import { getRoundedValue } from 'helpers/valueToShow';

export const getValidMapData = createSelector(
  [(items) => items.map((item) => ({ ...item, value: getRoundedValue(item.value, 2, false) }))],
  (items) => items.filter(({ lat, lng }) => lat && lng && lat > -90 && lat < 90 && lng > -180 && lng < 180),
);

export const blank = () => {};
