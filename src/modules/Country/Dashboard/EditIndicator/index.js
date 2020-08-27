import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import Fab from '@material-ui/core/Fab';
import { withSnackbar } from 'notistack';
import cloneDeep from 'lodash/cloneDeep';

import { actions as countryActions } from 'redux/country';
import { actions as indicatorsActions } from 'redux/indicators';

import { getYearsRange } from 'helpers/getYears';
import addNewRow from 'images/add-new-row.svg';
import Header from './Header';
import Select from './Select';
import Table from './Table';
import DatePicker from './DatePicker';
import TableSelect from './TableSelect';
import ButtonDelete from './Table/Button';

import * as S from './styled';

class EditIndicator extends PureComponent {
  state = {
    year: new Date().getFullYear(),
    isDisabled: false,
    data: null,
    shouldTableReload: false,
    fields: [],
  };

  tableWrapper = React.createRef();

  componentDidMount() {
    const { match: { params }, actions } = this.props;

    actions.fetchCountryRequest({
      slug: params.country,
    });

    actions.getIndicatorRequest(params);
  }

  componentDidUpdate(prevProps) {
    const {
      isLoading,
      successMessage,
      error,
      enqueueSnackbar,
      isUpdateLoading,
      data,
    } = this.props;

    if (prevProps.isLoading && !isLoading && data && data.length > 0) {
      this.setUpdatedState(data);
    }

    if (prevProps.isUpdateLoading !== isUpdateLoading) {
      this.disableSaveButton(isUpdateLoading);
    }

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }

    if (error && (prevProps.error !== error)) {
      if (typeof error === 'string') {
        enqueueSnackbar(error, { variant: 'error' });
      } else {
        enqueueSnackbar('Data format is invalid. Please check table cells.', { variant: 'error' });
        this.applyServerErrors();
      }
    }
  }

  applyServerErrors = () => {
    this.setState((state, props) => {
      const { fields } = state;
      const appliedErrorsData = cloneDeep(state.data);
      props.error.forEach((e) => {
        let fieldIndex;

        fields.forEach((field, index) => {
          if (field.key === e.path[1]) {
            fieldIndex = index;
          }
        });

        appliedErrorsData[e.path[0]][fieldIndex].className = 'required';
        appliedErrorsData[e.path[0]][fieldIndex].expr = appliedErrorsData[e.path[0]][fieldIndex].value;
      });

      return { data: appliedErrorsData, shouldTableReload: true };
    }, () => {
      this.setState({ shouldTableReload: false });
    });
  }

  setUpdatedState = (data) => {
    const { regions } = this.props;

    const formatedData = data.map((row) => row.map((column) => {
      const formatted = { ...column };

      if (column.key === 'date') {
        formatted.value = (
          <DatePicker
            value={column.dataValue}
            handleDateChange={(value) => this.handleCustomInputChange(column.rowId, value, column.key)}
          />
        );
      }

      if (column.key === 'regionId') {
        formatted.value = (
          <TableSelect
            name="region"
            items={regions || []}
            selected={column.dataValue}
            onChange={(value) => this.handleCustomInputChange(column.rowId, value, column.key)}
            fullWidth
          />
        );
      }

      if (column.key === 'delete') {
        return {
          readOnly: true,
          value: <ButtonDelete rowId={row[0].rowId} deleteRow={this.deleteRow} grid={data} />,
          key: 'delete',
        };
      }

      return formatted;
    }));

    this.setState({ data: formatedData, fields: this.props.fields });
  };

  handlePeriodChange = (value) => {
    const { actions, match: { params } } = this.props;

    actions.getIndicatorRequest({ ...params, year: value });

    this.setState({ year: value });
  }

  deleteRow = (rowId) => {
    const { data } = this.state;
    const newData = data.filter((row) => row[0].rowId !== rowId);

    this.setState({ data: newData }, () => (this.checkRequiredFields(this.state.data)));
  }

  addNewRow = () => {
    const { data } = this.state;
    const {
      regions,
      reportingPeriodType,
    } = this.props;

    const timestamp = Date.now();

    const newRow = this.props.fields.map((item) => {
      const defultValue = {
        value: '',
        expr: '',
        key: item.key,
        className: 'required',
      };

      if (item.key === 'dataId') {
        return {
          value: '',
          expr: '',
          rowId: timestamp,
          key: item.key,
          className: 'required',
        };
      }

      if (item.key === 'date') {
        return {
          value: null,
          dateValue: new Date(),
          key: item.key,
          rowId: timestamp,
          readOnly: true,
        };
      }

      if (item.key === 'regionId') {
        return {
          value: null,
          dataValue: regions[0].id,
          key: item.key,
          rowId: timestamp,
          readOnly: true,
        };
      }

      if (item.key === 'year' && reportingPeriodType === 'year') {
        return {
          value: this.state.year,
          rowId: timestamp,
          key: item.key,
          readOnly: true,
        };
      }

      if (item.isCustom) {
        return {
          value: '',
          expr: '',
          rowId: item.id,
          key: item.key,
          isCustom: item.isCustom,
          className: 'required',
        };
      }

      if (item.key === 'delete') {
        return {
          value: <ButtonDelete rowId={timestamp} deleteRow={this.deleteRow} grid={data} />,
          key: 'delete',
          readOnly: true,
        };
      }

      return defultValue;
    });
    const newData = (data && data.length) > 0 ? [...data, newRow] : [newRow];
    this.setUpdatedState(newData);
    this.disableSaveButton(true);
    setTimeout(() => {
      this.tableWrapper.scrollIntoView(false);
    }, 0);
  }

  handleCustomInputChange = (rowId, value, key) => {
    const { data, fields } = this.state;
    let fieldIndex;

    fields.forEach((field, index) => {
      if (field.key === key) {
        fieldIndex = index;
      }
    });
    const updatedData = data.map((it) => {
      if (it[0].rowId !== rowId) {
        return it;
      }

      const copy = [...it];

      copy[fieldIndex].dataValue = value;

      return copy;
    });

    this.setUpdatedState(updatedData);
  }

  updateSimpleData = (data) => this.setState({ data });

  disableSaveButton = (bool) => this.setState({ isDisabled: bool });

  checkRequiredFields = (grid) => {
    const isRequired = grid.some((row) => row.some((item) => item?.className === 'required'));
    this.disableSaveButton(isRequired);
  }

  checkRegion = () => {
    const { regions, fields } = this.props;

    const result = fields?.some((item) => item?.key === 'regionId');

    if (result && regions?.length === 0) {
      return false;
    }
    return true;
  }

  handleSave = () => {
    const {
      actions,
      match: { params },
    } = this.props;
    const {
      data,
      year,
    } = this.state;

    actions.updateIndicatorDataRequest({ data, ...params, year });
  }

  render() {
    const {
      history: { goBack },
      reportingPeriodType,
      t,
    } = this.props;
    const {
      year,
      data,
      isDisabled,
      shouldTableReload,
    } = this.state;

    return (
      <S.Wrapper>
        <Header onClickBack={() => goBack()} title={t('country.back_to_indicators')} />
        {reportingPeriodType === 'year' && (
          <S.Select>
            <Select
              title={t('country.choose_reporting_year')}
              name="year"
              items={getYearsRange()}
              selected={year}
              onChange={this.handlePeriodChange}
              fullWidth={false}
            />
          </S.Select>
        )}
        {this.checkRegion() ? (
          <>
            <S.Table ref={(el) => { this.tableWrapper = el; }}>
              {!shouldTableReload && data && (
                <Table
                  grid={data}
                  columns={this.props.fields}
                  deleteRow={this.deleteRow}
                  updateData={this.updateSimpleData}
                  checkRequiredFields={this.checkRequiredFields}
                />
              )}
            </S.Table>
            <S.FabWrapper>
              <S.AddNewRow
                addNewRow={addNewRow}
                onClick={this.addNewRow}
              />
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                aria-label="save"
                onClick={this.handleSave}
                disabled={isDisabled}
              >
                <SaveOutlinedIcon />
              </Fab>
            </S.FabWrapper>
          </>
        )
          : <S.RegionError>{t('country.region_error')}</S.RegionError>}
      </S.Wrapper>
    );
  }
}

EditIndicator.propTypes = {
  t: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  successMessage: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    getIndicatorRequest: PropTypes.func.isRequired,
    fetchCountryRequest: PropTypes.func.isRequired,
    updateIndicatorDataRequest: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  data: PropTypes.array,
  reportingPeriodType: PropTypes.string,
  fields: PropTypes.array,
  regions: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isUpdateLoading: PropTypes.bool,
};

EditIndicator.defaultProps = {
  data: [],
  isUpdateLoading: false,
  regions: [],
  fields: [],
  reportingPeriodType: undefined,
};

const mapStateToProps = ({
  indicators: {
    data: {
      data,
      fields,
      regions,
      reportingPeriodType,
    },
    isLoading,
    isUpdateLoading,
    error,
    successMessage,
  },
}) => ({
  data,
  fields,
  regions,
  reportingPeriodType,
  isLoading,
  isUpdateLoading,
  error,
  successMessage,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...indicatorsActions,
    ...countryActions,
  }, dispatch),
});

export default withSnackbar(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withTranslation()(EditIndicator)),
);
