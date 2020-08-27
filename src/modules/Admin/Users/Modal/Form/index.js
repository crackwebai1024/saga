import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import setFieldTouched from 'final-form-set-field-touched';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import { showedUserRoleMap, filterRoles } from 'helpers/roles';
import FormField from 'components/FormField';
import FormSelect from 'components/FormSelect';

import CheckboxGroup from './CheckboxGroup';
import { validate } from './validation';

import * as S from './styled';

const UserForm = ({
  isFormDisabled,
  onSubmit,
  initialValues,
  isEditing,
  onClose,
  isEditingCurrentUser,
  allowedCountriesIds,
  countries,
  userRole,
  t,
}) => {
  const allCountiesIds = countries.map((item) => item.id);

  const handleSelectAllCountriesClick = (formMutators) => () => (
    formMutators.setFieldValue({ name: t('common.countries'), value: allCountiesIds })
  );

  return (
    <Form
      onSubmit={onSubmit}
      validate={(values) => validate(values, allCountiesIds)}
      initialValues={{
        ...initialValues,
        countries: initialValues.countries ? initialValues.countries.map((item) => item.id) : [],
      }}
      mutators={{
        ...arrayMutators,
        setFieldTouched,
        setFieldValue: ([args], state, utils) => {
          utils.changeValue(state, args.name, () => args.value);
        },
      }}
      render={({ handleSubmit, dirty, form }) => (
        <S.FormContentContainer onSubmit={handleSubmit}>
          <FormField
            field={{
              inputType: 'text',
              label: t('admin.email'),
              value: 'email',
            }}
            disabled={isEditing}
          />
          <S.Row>
            <FormField
              field={{
                inputType: 'text',
                label: t('admin.first_name'),
                value: 'firstName',
              }}
            />
            <FormField
              field={{
                inputType: 'text',
                label: t('admin.last_name'),
                value: 'lastName',
              }}
            />
          </S.Row>
          <S.Row>
            <FormField
              field={{
                inputType: 'text',
                label: t('admin.position'),
                value: 'position',
              }}
            />
            <FormSelect
              field={{
                inputType: 'select',
                label: t('admin.access'),
                value: 'role',
                options: filterRoles(userRole, showedUserRoleMap)
                  .map((key) => ({
                    value: key,
                    name: showedUserRoleMap[key],
                  })),
              }}
              disabled={isEditingCurrentUser}
            />
          </S.Row>
          <FieldArray
            component={CheckboxGroup}
            name="countries"
            options={countries}
            allCountiesIds={allCountiesIds}
            allowedCountriesIds={allowedCountriesIds}
            isAccessToAllCountries={allowedCountriesIds.length === allCountiesIds.length}
            isEditingCurrentUser={isEditingCurrentUser}
            formMutators={form.mutators}
            handleSelectAllCountriesClick={handleSelectAllCountriesClick(form.mutators)}
          />
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

UserForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  isEditingCurrentUser: PropTypes.bool.isRequired,
  countries: PropTypes.array.isRequired,
  allowedCountriesIds: PropTypes.array.isRequired,
  userRole: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserForm);
