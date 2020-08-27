import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';

import Form from './Form';

import * as S from './styled';

const UserModal = ({
  open,
  initialValues,
  onSubmit,
  isFormDisabled,
  countries,
  allowedCountries,
  onClose,
  userId,
  userRole,
  t,
}) => {
  const isEditing = !!initialValues.id;
  const title = isEditing ? t('admin.edit_user') : t('admin.register_user');
  const isEditingCurrentUser = initialValues.id === userId;

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <S.Modal>
        <S.Title>{title}</S.Title>
        <Form
          allowedCountriesIds={allowedCountries.map((item) => item.id)}
          onSubmit={onSubmit}
          initialValues={initialValues}
          isEditing={isEditing}
          isEditingCurrentUser={isEditingCurrentUser}
          isFormDisabled={isFormDisabled}
          countries={countries}
          onClose={onClose}
          userRole={userRole}
        />
      </S.Modal>
    </Modal>
  );
};

UserModal.propTypes = {
  open: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  countries: PropTypes.array.isRequired,
  allowedCountries: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  userRole: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(UserModal);
