import i18n from 'locales';

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = i18n.t('invalid.section_name_is_required');
  }

  return errors;
};

export const blank = () => {};
