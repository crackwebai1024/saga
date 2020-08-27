import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import {
  IconButton,
} from '@material-ui/core';
import {
  Close as CloseIcon,
} from '@material-ui/icons';
import Form from './Form';

import * as S from './styled';

const MilestoneModal = ({
  open,
  initialValues: defaultValues,
  indicatorsOptions,
  responsibleParties,
  onSubmit,
  isFormDisabled,
  onClose,
  isLoading,
  filters,
}) => {
  const isEditing = !!defaultValues.id;
  const title = isEditing ? 'Edit milestone' : 'Add milestone';
  const initialValues = isEditing ? defaultValues : { ...defaultValues, indicatorId: filters.indicatorId };

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <S.Modal>
        <S.Title>
          {title}
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </S.Title>
        <Form
          isLoading={isLoading}
          onSubmit={onSubmit}
          initialValues={initialValues}
          isEditing={isEditing}
          indicatorsOptions={indicatorsOptions}
          responsibleParties={responsibleParties}
          isFormDisabled={isFormDisabled}
          onClose={onClose}
        />
      </S.Modal>
    </Modal>
  );
};

MilestoneModal.propTypes = {
  open: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  indicatorsOptions: PropTypes.array.isRequired,
  responsibleParties: PropTypes.array.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
};

export default MilestoneModal;
