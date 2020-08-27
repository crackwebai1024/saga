import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';

import { actions as countriesActions } from 'redux/countries';
import { actions as modalActions } from 'redux/app';

import * as rowsPagination from 'helpers/pagination';

import ConfirmationModal from 'components/ConfirmationModal';
import AmplitudeService from 'services/amplitude';

import Modal from 'modules/Admin/Countries/Modal';
import Toolbar from './Toolbar';
import Content from './Content';

import * as S from './styled';

const options = {
  rowsPerPageOptions: [5, 10, 25],
  minRowsPerPage: 5,
  displayedValues: new Map([
    ['id', 'id'],
    ['name', 'name'],
    ['citizens', 'served_citizens'],
    ['slug', 'slug'],
    ['color', 'color_theme'],
    ['logo', 'flag'],
  ]),
  defaultMainColor: '#000000',
  defaultFontMainColor: '#ffffff',
  defaultLogo: '',
};

class EnhancedTable extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      createCountryRequest: PropTypes.func.isRequired,
      countrySetModalState: PropTypes.func.isRequired,
      deleteCountryRequest: PropTypes.func.isRequired,
      getAllowedCountriesRequest: PropTypes.func.isRequired,
      getCountriesRequest: PropTypes.func.isRequired,
      getFormCountriesRequest: PropTypes.func.isRequired,
      getWorldCountriesRequest: PropTypes.func.isRequired,
      setConfirmModalState: PropTypes.func.isRequired,
      updateCountryRequest: PropTypes.func.isRequired,
    }).isRequired,
    allCount: PropTypes.number.isRequired,
    countries: PropTypes.array.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
    isConfirmModalOpen: PropTypes.bool.isRequired,
    idForDeletion: PropTypes.number.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    worldCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
    successMessage: PropTypes.string.isRequired,
  };

  state = {
    order: 'asc',
    orderBy: 'id',
    page: 0,
    rowsPerPage: options.rowsPerPageOptions[1],
    initialValues: {},
  };

  static getDerivedStateFromProps(props, state) {
    const { allCount } = props;
    const {
      rowsPerPage,
      page,
    } = state;

    return rowsPagination.isPageOutOfRange(allCount, rowsPerPage, page) ? ({
      page: 0,
    }) : null;
  }

  componentDidMount() {
    const { actions } = this.props;
    const {
      order,
      orderBy,
      page,
      rowsPerPage,
    } = this.state;

    actions.getCountriesRequest({
      order, orderBy, page, rowsPerPage,
    });
    actions.getWorldCountriesRequest();
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Countries Dashboard' });
  }

  componentDidUpdate(prevProps) {
    const {
      actions,
      successMessage,
      error,
      enqueueSnackbar,
    } = this.props;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
      actions.getAllowedCountriesRequest();
      actions.getFormCountriesRequest();
      actions.getWorldCountriesRequest();
      this.closeModal();
    }

    if (error && (prevProps.error !== error)) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }

  reloadCountries = () => {
    const {
      actions,
    } = this.props;
    const {
      order, orderBy, page, rowsPerPage,
    } = this.state;

    actions.getCountriesRequest({
      order, orderBy, page, rowsPerPage,
    });
  };

  handleRequestSort = (event, property) => {
    const {
      order: currentOrder, orderBy,
    } = this.state;

    const isDesc = orderBy === property && currentOrder === 'desc';
    const order = isDesc ? 'asc' : 'desc';

    this.setState({
      order,
      orderBy: property,
    }, this.reloadCountries);
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    }, this.reloadCountries);
  };

  handleChangeRowsPerPage = (event) => {
    const rowsPerPage = +event.target.value;

    this.setState({
      rowsPerPage,
      page: 0,
    }, this.reloadCountries);
  };

  setValues = (initialValues) => {
    this.setState({ initialValues }, () => {
      this.openModal();
    });
  };

  handleConfirmClickOpen = (id) => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: true, id });
  };

  handleConfirmClose = () => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: false, id: 0 });
  };

  onConfirmSubmit = () => {
    const {
      actions,
      idForDeletion,
      allCount,
    } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;

    const resettedPage = rowsPagination.isPageOutOfRange(allCount - 1, rowsPerPage, page) ? 0 : page;

    actions.deleteCountryRequest({
      id: idForDeletion,
      rowsPerPage,
      page: resettedPage,
      order,
      orderBy,
    });
    actions.setConfirmModalState({ state: false, id: 0 });
  };

  onSubmit = ({ color, ...initialValues }) => {
    const { actions: { createCountryRequest, updateCountryRequest } } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;

    if (initialValues.id) {
      updateCountryRequest({
        ...initialValues,
        mainColor: color.mainColor,
        fontMainColor: color.fontMainColor,
        page,
        rowsPerPage,
        orderBy,
        order,
      });
    } else {
      createCountryRequest({
        ...initialValues,
        mainColor: color.mainColor,
        fontMainColor: color.fontMainColor,
        page,
        rowsPerPage,
        orderBy,
        order,
      });
    }
  };

  openModal = () => {
    const { actions } = this.props;
    const { initialValues } = this.state;
    initialValues.mainColor = initialValues.mainColor || options.defaultMainColor;
    initialValues.fontMainColor = initialValues.fontMainColor || options.defaultFontMainColor;
    initialValues.logo = initialValues.logo || options.defaultLogo;

    this.setState({ initialValues }, () => {
      actions.countrySetModalState(true);
    });
  };

  closeModal = () => {
    const { actions } = this.props;

    actions.countrySetModalState(false);
    this.setState({ initialValues: {} });
  };

  render() {
    const {
      initialValues, rowsPerPage, page, order, orderBy,
    } = this.state;
    const {
      countries,
      allCount,
      isModalOpen,
      isConfirmModalOpen,
      isFormDisabled,
      worldCountries,
    } = this.props;

    return (
      <S.Root>
        <Toolbar onAdd={this.openModal} />
        <S.StyledPaper>
          <Content
            options={options}
            countries={countries}
            allCount={allCount}
            rowsPerPage={rowsPerPage}
            page={page}
            order={order}
            orderBy={orderBy}
            handleRequestSort={this.handleRequestSort}
            handleChangePage={this.handleChangePage}
            handleChangeRowsPerPage={this.handleChangeRowsPerPage}
            onEdit={this.setValues}
            onDelete={this.handleConfirmClickOpen}
          />
          <Modal
            open={isModalOpen}
            initialValues={initialValues}
            onClose={this.closeModal}
            onSubmit={this.onSubmit}
            isFormDisabled={isFormDisabled}
            countries={worldCountries}
          />
          <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onSubmit={this.onConfirmSubmit}
            onClose={this.handleConfirmClose}
          />
        </S.StyledPaper>
      </S.Root>
    );
  }
}

const mapStateToProps = ({
  countries: {
    list,
    allCount,
    isFormDisabled,
    isModalOpen,
    successMessage,
    error,
    worldCountries,
  },
  app: {
    isConfirmModalOpen,
    idForDeletion,
  },
}) => ({
  countries: list,
  allCount,
  isFormDisabled,
  isModalOpen,
  isConfirmModalOpen,
  idForDeletion,
  successMessage,
  error,
  worldCountries,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...countriesActions,
    ...modalActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EnhancedTable));
