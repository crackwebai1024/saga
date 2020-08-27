import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';

import Form from './Form';

import * as S from './styled';

const CountryModal = ({
  open,
  initialValues,
  onSubmit,
  isFormDisabled,
  onClose,
  t,
}) => {
  const isEditing = !!initialValues.id;
  const title = isEditing ? t('manageDashboard.edit_section') : t('manageDashboard.add_section');

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
  t: PropTypes.func.isRequired,
};

export default withTranslation()(CountryModal);
