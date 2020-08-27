import i18n from 'locales';

export const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = i18n.t('invalid.project_is_required');
  }

  return errors;
};

export const blank = () => {};
