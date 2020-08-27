import { createSelector } from 'reselect';

export const getLoaderState = createSelector(
  [
    (state) => state.loader,
    (state) => state.auth,
    (state) => state.countries,
    (state) => state.country,
    (state) => state.global,
    (state) => state.indicators,
    (state) => state.indicatorDetails,
    (state) => state.indicatorsGroups,
    (state) => state.password,
    (state) => state.sections,
    (state) => state.users,
  ],
  (
    loader,
    auth,
    countries,
    country,
    global,
    indicators,
    indicatorDetails,
    indicatorsGroups,
    password,
    sections,
    users,
  ) => (
    loader.isOpen
    || auth.isAuthenticatedLoading
    || auth.isLoading
    || auth.isLoginLoading
    || auth.isRegisterLoading
    || countries.isLoading
    || countries.isAllowedListLoading
    || countries.isWorldCountriesLoading
    || country.isLoading
    || global.isMapDataLoading
    || global.isStatusDataLoading
    || global.isListDataLoading
    || indicators.isLoading
    || indicatorDetails.isLoading
    || indicatorDetails.isLoadingMap
    || indicatorsGroups.isLoading
    || password.isLoading
    || sections.isLoading
    || users.isLoading
  ),
);

export const blank = () => {};
