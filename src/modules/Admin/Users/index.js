import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';

import { actions as usersActions } from 'redux/users';
import { actions as modalActions } from 'redux/app';

import * as rowsPagination from 'helpers/pagination';

import ConfirmationModal from 'components/ConfirmationModal';
import AmplitudeService from 'services/amplitude';

import Toolbar from './Toolbar';
import Modal from './Modal';
import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';

import * as S from './styled';

const options = {
  rowsPerPageOptions: [5, 10, 25],
  minRowsPerPage: 5,
};

const columns = [
  {
    label: 'First Name',
    key: 'firstName',
    i18nKey: 'first_name',
  },
  {
    label: 'Last Name',
    key: 'lastName',
    i18nKey: 'last_name',
  },
  {
    label: 'Email',
    key: 'email',
    i18nKey: 'email',
  },
  {
    label: 'Country',
    key: 'countries',
    i18nKey: 'countries',
  },
  {
    label: 'Country / Organization',
    key: 'position',
    i18nKey: 'position',
  },
  {
    label: 'Role',
    key: 'role',
    i18nKey: 'role',
  },
  {
    label: 'Actions',
    key: 'actions',
    i18nKey: '',
  },
];

class Users extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getUsersRequest: PropTypes.func.isRequired,
      updateUserRequest: PropTypes.func.isRequired,
      registerUserRequest: PropTypes.func.isRequired,
      deleteUserRequest: PropTypes.func.isRequired,
      setConfirmModalState: PropTypes.func.isRequired,
      userSetModalState: PropTypes.func.isRequired,
    }).isRequired,
    users: PropTypes.array.isRequired,
    currentUser: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    isConfirmModalOpen: PropTypes.bool.isRequired,
    idForDeletion: PropTypes.number.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
    countriesList: PropTypes.array.isRequired,
    allowedCountries: PropTypes.array.isRequired,
    t: PropTypes.func.isRequired,
  };

  state = {
    order: 'asc',
    orderBy: 'id',
    initialValues: {},
    page: 0,
    rowsPerPage: options.rowsPerPageOptions[2],
  };

  static getDerivedStateFromProps(props, state) {
    const { count } = props;
    const {
      page,
      rowsPerPage,
    } = state;

    return rowsPagination.isPageOutOfRange(count, rowsPerPage, page) ? ({
      page: 0,
    }) : null;
  }

  componentDidMount() {
    const { actions } = this.props;
    const {
      order, orderBy, page, rowsPerPage,
    } = this.state;
    actions.getUsersRequest({
      order, sort: orderBy, page, rowsPerPage,
    });
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Users Dashboard' });
  }

  componentDidUpdate(prevProps) {
    const {
      successMessage,
      error,
      enqueueSnackbar,
    } = this.props;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
      this.closeModal();
    }

    if (error && (prevProps.error !== error)) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }

  getBody() {
    const {
      rowsPerPage, page, order, orderBy,
    } = this.state;
    const {
      users,
      count,
      currentUser,
    } = this.props;
    const emptyRows = options.minRowsPerPage - Math.min(options.minRowsPerPage, count - (page * rowsPerPage));

    return (
      <>
        <S.TableWrapper>
          <S.StyledTable aria-labelledby="tableTitle">
            <Header
              headRows={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <Body
              onDelete={this.handleConfirmClickOpen}
              onEdit={this.setInitialValues}
              rows={users}
              emptyRows={emptyRows}
              currentUser={currentUser}
            />
          </S.StyledTable>
        </S.TableWrapper>
        <Pagination
          rowsPerPageOptions={options.rowsPerPageOptions}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </>
    );
  }

  reloadUsers = () => {
    const {
      actions,
    } = this.props;
    const {
      order, orderBy, page, rowsPerPage,
    } = this.state;

    actions.getUsersRequest({
      order, sort: orderBy, page, rowsPerPage,
    });
  };

  handleRequestSort = (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
      page: 0,
    }, this.reloadUsers);
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    }, this.reloadUsers);
  };

  setInitialValues = (initialValues) => {
    this.setState({ initialValues }, () => {
      this.openModal();
    });
  };

  handleChangeRowsPerPage = (event) => {
    const rowsPerPage = +event.target.value;

    this.setState({
      rowsPerPage,
      page: 0,
    }, this.reloadUsers);
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
      count,
      t,
    } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;

    const resettedPage = rowsPagination.isPageOutOfRange(count - 1, rowsPerPage, page) ? 0 : page;

    actions.deleteUserRequest({
      id: idForDeletion,
      rowsPerPage,
      page: resettedPage,
      order,
      sort: orderBy,
      t,
    });
    actions.setConfirmModalState({ state: false, id: 0 });
  };

  openModal = () => {
    const { actions } = this.props;

    actions.userSetModalState(true);
  };

  closeModal = () => {
    const { actions } = this.props;

    actions.userSetModalState(false);
    this.setState({ initialValues: {} });
  };

  onSubmit = (values) => {
    const { actions: { registerUserRequest, updateUserRequest } } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;

    if (values.id) {
      updateUserRequest({
        ...values,
        page,
        rowsPerPage,
        sort: orderBy,
        order,
      });
    } else {
      registerUserRequest({
        ...values,
        page,
        rowsPerPage,
        sort: orderBy,
        order,
      });
    }
  };

  render() {
    const {
      initialValues,
    } = this.state;

    const {
      isModalOpen,
      isConfirmModalOpen,
      isFormDisabled,
      currentUser,
      countriesList,
      allowedCountries,
    } = this.props;

    return (
      <S.Root>
        <Toolbar onAdd={this.openModal} />
        <S.StyledPaper>
          {this.getBody()}
        </S.StyledPaper>
        <Modal
          open={isModalOpen}
          initialValues={initialValues}
          countries={countriesList}
          allowedCountries={allowedCountries}
          userId={currentUser.id}
          userRole={currentUser.role}
          onClose={this.closeModal}
          onSubmit={this.onSubmit}
          isFormDisabled={isFormDisabled}
        />
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onSubmit={this.onConfirmSubmit}
          onClose={this.handleConfirmClose}
        />
      </S.Root>
    );
  }
}

const mapStateToProps = ({
  users: {
    usersList,
    count,
    isModalOpen,
    successMessage,
    isFormDisabled,
    error,
  },
  app: {
    isConfirmModalOpen,
    idForDeletion,
  },
  auth: {
    user,
  },
  countries: {
    formList,
    allowedList,
  },
}) => ({
  users: usersList,
  currentUser: user,
  isModalOpen,
  count,
  successMessage,
  isFormDisabled,
  error,
  isConfirmModalOpen,
  idForDeletion,
  countriesList: formList,
  allowedCountries: allowedList,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...usersActions,
    ...modalActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withTranslation()(Users)));
