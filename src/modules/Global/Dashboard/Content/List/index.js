import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { actions as globalActions } from 'redux/global';
import { withTranslation } from 'react-i18next';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import TableBody from './TableBody';
import * as S from './styled';
import options from './config';

class List extends Component {
  state = {
    page: 0,
    pageCount: options.pageCountOptions[1],
    shouldPrint: false,
    orderBy: 'country',
    order: 'asc',
  };

  componentDidMount() {
    this.fetchListData();
  }

  componentDidUpdate(prevProps) {
    const {
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
      isPrint,
      isListDataLoading,
      onPrint,
    } = this.props;
    const { shouldPrint } = this.state;

    const isPeriodUpdated = prevProps.selectedPeriod !== selectedPeriod;
    const isCountryUpdated = prevProps.selectedCountry !== selectedCountry;
    const isProjectUpdated = prevProps.selectedProject !== selectedProject;
    const isSectionUpdated = prevProps.selectedSection !== selectedSection;
    const isStatusUpdated = prevProps.selectedStatuses !== selectedStatuses;

    if (isPeriodUpdated || isCountryUpdated || isProjectUpdated || isSectionUpdated || isStatusUpdated) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        page: 0,
      }, this.fetchListData);
    }

    if (prevProps.isPrint !== isPrint && isPrint) {
      this.handlePrint();
    }

    if (shouldPrint) {
      if (!isListDataLoading) {
        window.print();
        window.onafterprint = (() => {
          this.fetchListData();
          onPrint(false);
        })();
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ shouldPrint: false });
      }
    }
  }

  fetchListData = () => {
    const {
      actions,
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
    } = this.props;
    const {
      page,
      pageCount,
      orderBy,
      order,
    } = this.state;

    actions.getGlobalListDataRequest({
      year: selectedPeriod,
      country: selectedCountry === -1 ? undefined : selectedCountry,
      project: selectedProject === -1 ? undefined : selectedProject,
      section: selectedSection === -1 ? undefined : selectedSection,
      statuses: selectedStatuses,
      page,
      pageCount,
      order,
      sort: orderBy,
    });
  }

  handlePrint = () => {
    this.getAllDataList();

    this.setState({ shouldPrint: true });
  }

  getAllDataList = () => {
    const {
      actions,
      selectedPeriod,
      selectedCountry,
      selectedProject,
      selectedSection,
      selectedStatuses,
    } = this.props;

    actions.getGlobalListDataRequest({
      year: selectedPeriod,
      country: selectedCountry === -1 ? undefined : selectedCountry,
      project: selectedProject === -1 ? undefined : selectedProject,
      section: selectedSection === -1 ? undefined : selectedSection,
      statuses: selectedStatuses,
    });
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    }, this.fetchListData);
  };

  handleChangePageCount = (event) => {
    const pageCount = +event.target.value;

    this.setState({
      pageCount,
      page: 0,
    }, this.fetchListData);
  };

  updateSortBy = (key) => {
    const isDesc = this.state.orderBy === key && this.state.order === 'desc';
    const order = isDesc ? 'asc' : 'desc';
    this.setState({ orderBy: key, order }, this.fetchListData);
  }

  render() {
    const {
      listData: {
        items,
        count,
      },
      t,
      isPrint,
    } = this.props;

    const {
      page,
      pageCount,
      orderBy,
      order,
    } = this.state;

    if (!items) {
      return null;
    }

    const columns = Object.entries(options.columnNames);
    const emptyRows = options.minPageCount - Math.min(options.minPageCount, count - (page * pageCount));

    return (
      <>
        <S.Label>
          {t('global.priorities_indicators')}
        </S.Label>
        <S.StyledPaper>
          <S.TableWrapper>
            <S.Table>
              <S.TableHead>
                <S.TableRow>
                  {columns.map(([colKey, colName], index) => (
                    <S.TableCell
                      key={colKey}
                      align={options.colAlign[index]}
                    >
                      <TableSortLabel
                        active={orderBy === colKey}
                        direction={order}
                        onClick={() => this.updateSortBy(colKey)}
                      >
                        {t(`common.${colName}`)}
                      </TableSortLabel>
                    </S.TableCell>
                  ))}
                </S.TableRow>
              </S.TableHead>
              <TableBody
                columns={columns}
                rows={items}
                emptyRows={emptyRows}
                colAlign={options.colAlign}
              />
            </S.Table>
          </S.TableWrapper>
          {!isPrint && (
            <S.StyledPagination
              rowsPerPageOptions={options.pageCountOptions}
              count={count}
              rowsPerPage={pageCount}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangePageCount}
            />
          )}
        </S.StyledPaper>
      </>
    );
  }
}

List.propTypes = {
  selectedPeriod: PropTypes.number.isRequired,
  selectedCountry: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selectedProject: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selectedSection: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  selectedStatuses: PropTypes.array.isRequired,
  listData: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    getGlobalListDataRequest: PropTypes.func.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  isPrint: PropTypes.bool.isRequired,
  isListDataLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({
  global: {
    selectedPeriod,
    selectedCountry,
    selectedProject,
    selectedSection,
    selectedStatuses,
    listData,
    isListDataLoading,
  },
}) => ({
  selectedPeriod,
  selectedCountry,
  selectedProject,
  selectedSection,
  selectedStatuses,
  listData,
  isListDataLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...globalActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(List);
