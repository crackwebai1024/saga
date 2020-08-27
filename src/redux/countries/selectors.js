import { createSelector } from 'reselect';

const getCountriesList = (allowedList) => allowedList;
const getRequestedCountrySlug = (allowedList, props) => props.match.params.country;

export const checkAccessToCountry = createSelector(
  [getCountriesList, getRequestedCountrySlug],
  (allowedCountries, slug) => (
    !!allowedCountries.filter((country) => country.slug === slug).length
  ),
);

export const blank = () => {};
