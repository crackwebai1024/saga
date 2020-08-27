import i18n from 'locales';

export const validateResetPassword = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = i18n.t('invalid.password_is_required');
  } else if (values.password.trim().length < 6) {
    errors.password = i18n.t('invalid.at_least_6_symbols');
  } else if (values.password.trim().length > 70) {
    errors.password = i18n.t('invalid.more_than_70_symbols');
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = i18n.t('invalid.confirm_password_is_required');
  }

  if ((values.password && values.confirmPassword) && (values.confirmPassword !== values.password)) {
    errors.confirmPassword = i18n.t('invalid.passwords_do_not_match');
  }

  return errors;
};

export const blank = () => {};
