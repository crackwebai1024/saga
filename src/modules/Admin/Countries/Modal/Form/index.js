import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';
import arrayMutators from 'final-form-arrays';
import setFieldTouched from 'final-form-set-field-touched';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Uploader from 'components/Uploader';
import FormField from 'components/FormField';
import FormSelect from 'components/FormSelect';

import { colorOptions } from 'theme';
import { validate } from './validation';

import * as S from './styled';

const formatFromValues = (initialValues) => {
  const keys = Object.keys(colorOptions);
  for (let i = 0; i < keys.length; i += 1) {
    const color = colorOptions[keys[i]];
    if (color.mainColor === initialValues.mainColor.toUpperCase()
    && color.fontMainColor === initialValues.fontMainColor.toUpperCase()) {
      return {
        ...initialValues,
        color,
      };
    }
  }
  return {
    ...initialValues,
    color: {
      mainColor: initialValues.mainColor.toUpperCase(),
      fontMainColor: initialValues.fontMainColor.toUpperCase(),
    },
  };
};

const CountryForm = ({
  isFormDisabled,
  onSubmit,
  initialValues,
  countries,
  isEditing,
  onClose,
  t,
}) => {
  const countriesList = isEditing ? [initialValues.name, ...countries].sort() : countries;

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => validate(values)}
      initialValues={{
        ...formatFromValues(initialValues),
        lat: initialValues.lat ? initialValues.lat.toString() : '0',
        lng: initialValues.lng ? initialValues.lng.toString() : '0',
      }}
      mutators={{
        ...arrayMutators,
        setFieldTouched,
        setFieldValue: ([args], state, utils) => {
          utils.changeValue(state, args.name, () => args.value);
        },
      }}
      render={({ handleSubmit, dirty }) => (
        <S.FormContentContainer onSubmit={handleSubmit}>
          <FormSelect
            field={{
              inputType: 'select',
              label: t('admin.country'),
              value: 'name',
              options: countriesList.map((name) => ({
                value: name,
                name,
              })),
              disabled: !!initialValues.indicatorsDataCount,
            }}
          />
          <FormField
            field={{
              inputType: 'number',
              label: t('admin.served_citizens'),
              value: 'citizens',
            }}
            inputProps={{
              min: 1,
            }}
          />
          <FormSelect
            field={{
              inputType: 'select',
              label: t('admin.color_theme'),
              value: 'color',
              options: Object.keys(colorOptions).map((name) => ({
                value: colorOptions[name],
                name,
              })),
            }}
          />
          <S.Row>
            <FormField
              field={{
                inputType: 'color',
                label: t('admin.main_color'),
                value: 'color.mainColor',
              }}
              disabled
            />
            <FormField
              field={{
                inputType: 'color',
                label: t('admin.main_font_color'),
                value: 'color.fontMainColor',
              }}
              disabled
            />
          </S.Row>
          <S.Row>
            <Uploader
              name="logoUpload"
              accept={['image/jpeg', 'image/png']}
              hasPreviewAvatar
              defaultValue={initialValues.logo}
            />
          </S.Row>
          <DialogActions>
            <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
            <Button color="primary" disabled={isFormDisabled || !dirty} type="submit">
              {t('common.save')}
            </Button>
          </DialogActions>
        </S.FormContentContainer>
      )}
    />
  );
};

CountryForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(CountryForm);
