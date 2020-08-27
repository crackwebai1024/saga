import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';

import FormField from 'components/FormField';

import { validate } from './validation';

import * as S from './styled';
import { TitleCell, ColorCell, FieldsWrapper } from '../styled.js';

const ColorForm = ({
  isEditing,
  colors,
  initialValues,
  onSubmit,
  onClose,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values, colors)}
    initialValues={initialValues}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <FieldsWrapper>
          <TitleCell>
            <FormField
              field={{
                inputType: 'text',
                label: t('common.name'),
                value: 'secondaryGroupName',
              }}
              inputProps={{
                maxLength: 30,
              }}
            />
          </TitleCell>
          <ColorCell>
            <FormField
              field={{
                inputType: 'color',
                label: t('manageDashboard.color'),
                value: 'color',
              }}
            />
          </ColorCell>
        </FieldsWrapper>
        <S.DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button color="primary" type="submit">
            {isEditing ? t('common.save') : t('common.add')}
          </Button>
        </S.DialogActions>
      </S.FormContentContainer>
    )}
  />
);

ColorForm.propTypes = {
  isEditing: PropTypes.bool,
  colors: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

ColorForm.defaultProps = {
  isEditing: false,
};

export default withTranslation()(ColorForm);
