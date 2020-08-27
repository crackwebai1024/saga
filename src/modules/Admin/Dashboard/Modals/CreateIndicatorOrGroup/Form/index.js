import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { withTranslation } from 'react-i18next';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';

import FormField from 'components/FormField';
import FormRadio from 'components/FormRadio';

import { validate } from './validation';

import * as S from './styled';

const SectionForm = ({
  type,
  onSubmit,
  onClose,
  t,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={(values) => validate(values)}
    initialValues={{
      type: 'indicator',
    }}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <S.Row>
          <FormField
            field={{
              inputType: 'text',
              label: t('common.name'),
              value: 'title',
            }}
            inputProps={{
              maxLength: 60,
            }}
          />
        </S.Row>
        {type === 'indicator' ? (
          <S.HideRow>
            <FormField
              field={{
                inputType: 'text',
                label: t('common.type'),
                value: 'type',
                initialValue: type,
              }}
            />
          </S.HideRow>
        ) : (
          <S.RowRadio>
            <FormRadio
              field={{
                name: 'type',
                label: t('common.type'),
              }}
              items={[
                {
                  value: 'indicator',
                  name: t('common.indicator'),
                },
                {
                  value: 'indicator-group',
                  name: t('common.indicator_group'),
                },
              ]}
            />
          </S.RowRadio>
        )}
        <DialogActions>
          <Button color="secondary" onClick={onClose}>{t('common.close')}</Button>
          <Button color="primary" type="submit">{t('common.save')}</Button>
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

SectionForm.propTypes = {
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(SectionForm);
