import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';

import Form from './Form';

import * as S from './styled';

const CountryModal = ({
  open,
  initialValues,
  countries,
  onSubmit,
  isFormDisabled,
  onClose,
  t,
}) => {
  const isEditing = !!initialValues.id;
  const title = isEditing ? t('admin.edit_country') : t('admin.register_country');

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <S.Modal>
        <S.Title>{title}</S.Title>
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          isEditing={isEditing}
          isFormDisabled={isFormDisabled}
          onClose={onClose}
          countries={countries}
        />
      </S.Modal>
    </Modal>
  );
};

CountryModal.propTypes = {
  open: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  countries: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(CountryModal);
