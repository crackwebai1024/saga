import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import FormCheckbox from 'components/FormCheckbox';
import * as S from './styled';

const CheckboxGroup = ({
  allowedCountriesIds,
  fields,
  formMutators,
  meta,
  handleSelectAllCountriesClick,
  isAccessToAllCountries,
  isEditingCurrentUser,
  options,
  t,
}) => {
  const getIsChecked = (value) => {
    let isChecked = false;

    if (fields.value) {
      isChecked = fields.value && fields.value.includes(value);
    }

    return isChecked;
  };

  const handleChange = (input) => {
    formMutators.setFieldTouched(input.name, true);
  };

  return (
    <>
      <FormControl error={!!(meta.touched && meta.error)}>
        <S.Row>
          <FormLabel>{t('admin.countries')}</FormLabel>
          {isAccessToAllCountries && !isEditingCurrentUser && (
            <Button color="primary" onClick={handleSelectAllCountriesClick}>
              {t('admin.select_all_countries')}
            </Button>
          )}
        </S.Row>
        {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
        <S.GroupContainer>
          {options.map((option) => (
            <S.FieldContainer key={option.id}>
              <FormCheckbox
                field={{
                  inputType: 'checkbox',
                  name: 'countries',
                  label: option.name,
                  value: option.id,
                  options,
                }}
                onChange={handleChange}
                disabled={isEditingCurrentUser || !allowedCountriesIds.includes(option.id)}
                checked={getIsChecked(option.id)}
              />
            </S.FieldContainer>
          ))}
        </S.GroupContainer>
      </FormControl>
    </>
  );
};

CheckboxGroup.propTypes = {
  allowedCountriesIds: PropTypes.arrayOf(PropTypes.number),
  fields: PropTypes.object.isRequired,
  formMutators: PropTypes.object.isRequired,
  handleSelectAllCountriesClick: PropTypes.func.isRequired,
  isAccessToAllCountries: PropTypes.bool.isRequired,
  isEditingCurrentUser: PropTypes.bool.isRequired,
  meta: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func.isRequired,
};

CheckboxGroup.defaultProps = {
  allowedCountriesIds: [],
};

export default withTranslation()(CheckboxGroup);
