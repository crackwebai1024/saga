import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import * as S from './styled';

const ConfirmationModal = ({
  isOpen,
  onSubmit,
  onClose,
  title,
  t,
}) => (
  <Dialog
    open={isOpen}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      {title
        ? (
          <S.TitleTargets>
            {t('common.confirm_deletining')}: {title}
          </S.TitleTargets>
        )
        : (
          <S.Title>
            {t('common.confirm_deletining_admin')}
          </S.Title>
        )}
    </DialogTitle>
    <S.Wrapper>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          {t('common.cancel')}
        </Button>
        <Button onClick={onSubmit} color="primary" autoFocus>
          {t('common.submit')}
        </Button>
      </DialogActions>
    </S.Wrapper>
  </Dialog>
);

ConfirmationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = {
  title: '',
};

export default withTranslation()(ConfirmationModal);
