import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Modal from '@material-ui/core/Modal';

import Form from './Form';

import * as S from './styled';

const CreateIndicatorOrGroupModal = ({
  type,
  open,
  onSubmit,
  onClose,
  t,
}) => (
  <Modal
    open={open}
    onClose={onClose}
  >
    <S.Modal>
      <S.Title>
        {type === 'indicator' ? t('manageDashboard.create_indicator') : t('manageDashboard.add_section_item')}
      </S.Title>
      <Form
        type={type}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </S.Modal>
  </Modal>
);


CreateIndicatorOrGroupModal.propTypes = {
  type: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(CreateIndicatorOrGroupModal);
