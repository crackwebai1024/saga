import i18n from 'locales';

export const validate = (values, colors) => {
  const errors = {};
  const sameNameColor = colors.find(({ secondaryGroupName }) => secondaryGroupName === values.secondaryGroupName);

  if (!values.secondaryGroupName) {
    errors.secondaryGroupName = i18n.t('invalid.item_name_is_required');
  } else if (values.secondaryGroupName.length < 2) {
    errors.secondaryGroupName = i18n.t('invalid.color_name_should_be_more_than_1_symbol');
  } else if (!values.id && sameNameColor) {
    errors.secondaryGroupName = i18n.t('invalid.color_name_already_exists');
  } else if (values.id && sameNameColor && values.id !== sameNameColor.id) {
    errors.secondaryGroupName = i18n.t('invalid.color_name_already_exists');
  }
  if (!values.color) {
    errors.color = i18n.t('invalid.color_is_required');
  }

  return errors;
};

export const blank = () => {};
