import { emailRegExp } from 'helpers/regexp';

export const validateLogin = (values, t) => {
  const errors = {};

  if (!values.email) {
    errors.email = t('invalid.email_is_required');
  } else if (!emailRegExp.test(values.email.trim())) {
    errors.email = t('invalid.invalid_email_address');
  } else if (values.email.length > 255) {
    errors.email = t('invalid.more_than_255_symbols');
  }

  return errors;
};

export const blank = () => {};
