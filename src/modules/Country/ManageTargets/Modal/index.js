import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';

import Form from './Form';

import * as S from './styled';

const TargetModal = ({
  open,
  initialValues,
  onSubmit,
  isFormDisabled,
  onClose,
  details,
  t,
}) => {
  const isEditing = !!initialValues.id;
  const title = isEditing ? t('common.edit_target') : t('common.add_target');
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
          types={details}
        />
      </S.Modal>
    </Modal>
  );
};

TargetModal.propTypes = {
  open: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(TargetModal);
