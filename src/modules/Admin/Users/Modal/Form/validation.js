import { emailRegExp } from 'helpers/regexp';
import i18n from 'locales';

export const validate = (values, allowedCountriesIds) => {
  const errors = {};

  if (!values.email) {
    errors.email = i18n.t('invalid.email_is_required');
  } else if (!emailRegExp.test(values.email.trim())) {
    errors.email = i18n.t('invalid.invalid_email_address');
  } else if (values.email.length > 255) {
    errors.email = i18n.t('invalid.more_than_255_symbols');
  }

  if (!values.firstName) {
    errors.firstName = i18n.t('invalid.first_name_is_required');
  }
  if (!values.lastName) {
    errors.lastName = i18n.t('invalid.last_name_is_required');
  }
  if (!values.position) {
    errors.position = i18n.t('invalid.position_is_required');
  }
  if (!values.role) {
    errors.role = i18n.t('invalid.role_is_required');
  }
  if (!values.countries || values.countries.filter((i) => allowedCountriesIds.includes(i)).length < 1) {
    errors.citiesIds = i18n.t('invalid.at_least_one_country_is_required');
  }

  return errors;
};

export const blank = () => {};
