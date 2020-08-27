import i18n from 'locales';

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = i18n.t('invalid.target_type_is_required');
  }
  if (!values.year) {
    errors.year = i18n.t('invalid.year_is_required');
  }
  if (!values.value) {
    errors.value = i18n.t('invalid.value_is_required');
  }
  if (parseInt(values.value, 10) < 0) {
    errors.value = i18n.t('invalid.value_can_not_be_negative_number');
  }

  return errors;
};

export const blank = () => {};
