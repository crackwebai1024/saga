import i18n from 'locales';

export const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = i18n.t('invalid.country_is_required');
  }
  if (values.slug && !/^[a-z\-_]+$/i.test(values.slug)) {
    errors.slug = i18n.t('invalid.slug_must_contain_letters_and_symbols');
  }
  if (!values.citizens) {
    errors.citizens = i18n.t('invalid.served_citizens_is_required');
  }
  if (!values.color) {
    errors.color = i18n.t('invalid.main_color_is_required');
  }
  // if (!values.fontMainColor) {
  //   errors.fontMainColor = i18n.t('invalid.font_color_is_required');
  // }

  return errors;
};

export const blank = () => {};
