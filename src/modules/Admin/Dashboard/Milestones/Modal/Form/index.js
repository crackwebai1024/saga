import React from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import setFieldTouched from 'final-form-set-field-touched';
import moment from 'moment';

import DialogActions from '@material-ui/core/DialogActions';

import FormField from 'components/FormField';
import * as Material from 'components/material';
import Loader from 'components/Loader/index';
import { getMilestonesStatusKeys, getMilestoneStatusProperty } from 'helpers/milestonesStatuses';

import TextField from './TextField';
import Autosuggest from './Autosuggest';
import IndicatorSelect from './IndicatorSelect';
import StatusSelect from './StatusSelect';
import { validate } from './validation';

import * as S from './styled';

const statusesOptions = getMilestonesStatusKeys().map((key) => ({
  value: key,
  name: getMilestoneStatusProperty(key, 'text'),
}));

const minDate = moment(`${moment().year() - 5}-01-01`);
const maxDate = moment(`${moment().year() + 30}-12-31`);

const MilestoneForm = ({
  isFormDisabled,
  onSubmit,
  initialValues,
  isEditing,
  indicatorsOptions,
  responsibleParties,
  onClose,
  isLoading,
}) => (
  <Form
    onSubmit={onSubmit}
    validate={validate}
    initialValues={initialValues}
    mutators={{
      ...arrayMutators,
      setFieldTouched,
      setFieldValue: ([args], state, utils) => {
        utils.changeValue(state, args.name, () => args.value);
      },
    }}
    render={({ handleSubmit }) => (
      <S.FormContentContainer onSubmit={handleSubmit}>
        <S.Row>
          <IndicatorSelect
            field={{
              inputType: 'select',
              label: 'Choose Indicator',
              value: 'indicatorId',
              options: indicatorsOptions,
            }}
            disabled={isEditing}
          />
        </S.Row>
        <S.Row>
          <Field name="startDate">
            {({ input, meta }) => (
              <S.StyledDatePicker
                {...input}
                value={input.value || null}
                variant="dialog"
                views={['year', 'month']}
                label="Start date"
                clearable
                minDate={minDate}
                maxDate={maxDate}
                emptyLabel=""
                clearLabel="Clear"
                allowKeyboardControl
                error={!!(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
          <Field name="completionDate">
            {({ input, meta }) => (
              <S.StyledDatePicker
                {...input}
                value={input.value || null}
                variant="dialog"
                views={['year', 'month']}
                label="Estimated completion  date"
                clearable
                minDate={minDate}
                maxDate={maxDate}
                emptyLabel=""
                clearLabel="Clear"
                allowKeyboardControl
                error={!!(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
              />
            )}
          </Field>
        </S.Row>
        <S.Row>
          <FormField
            field={{
              inputType: 'text',
              label: 'Milestone',
              value: 'name',
            }}
            maxLength={255}
          />
          <Autosuggest
            label="Responsible Party"
            name="responsibleParty"
            values={responsibleParties}
          />
          <StatusSelect
            field={{
              inputType: 'select',
              label: 'Status',
              value: 'status',
              options: statusesOptions,
            }}
          />
        </S.Row>
        <S.Row>
          <S.Column>
            <S.Label>Remarks</S.Label>
            <TextField
              field={{
                inputType: 'text',
                label: 'Remarks',
                value: 'remarks',
              }}
              maxTextLength={600}
            />
          </S.Column>
        </S.Row>
        <DialogActions>
          {!isLoading ? (
            <>
              <Material.Button
                color="secondary"
                onClick={onClose}
                type="button"
              >
                Close
              </Material.Button>
              <Material.Button
                disabled={isFormDisabled}
                color="secondary"
                type="submit"
                variant="contained"
              >
                Save
              </Material.Button>
            </>
          ) : <Loader />}
        </DialogActions>
      </S.FormContentContainer>
    )}
  />
);

MilestoneForm.propTypes = {
  isEditing: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  indicatorsOptions: PropTypes.array.isRequired,
  responsibleParties: PropTypes.array.isRequired,
};

export default MilestoneForm;
