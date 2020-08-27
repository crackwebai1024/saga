import { emailRegExp } from 'helpers/regexp';
import i18n from 'locales';

export const validateLogin = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = i18n.t('invalid.email_is_required');
  } else if (!emailRegExp.test(values.email.trim())) {
    errors.email = i18n.t('invalid.invalid_email_address');
  } else if (values.email.length > 255) {
    errors.email = i18n.t('invalid.more_than_255_symbols');
  }

  if (!values.password) {
    errors.password = i18n.t('invalid.password_is_required');
  }

  return errors;
};

export const blank = () => {};
