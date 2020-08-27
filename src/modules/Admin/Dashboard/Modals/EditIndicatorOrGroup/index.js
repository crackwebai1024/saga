import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';

import Form from './Form';

import * as S from './styled';

const EditIndicatorOrGroup = ({
  open,
  onSubmit,
  onClose,
  initialValues,
  isFormDisabled,
  t,
}) => {
  const isGroup = Object.keys(initialValues).includes('isSystem');
  const title = isGroup ? t('manageDashboard.edit_indicator_group') : t('manageDashboard.edit_indicator');

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
          isFormDisabled={isFormDisabled}
          onClose={onClose}
        />
      </S.Modal>
    </Modal>
  );
};

EditIndicatorOrGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EditIndicatorOrGroup);
