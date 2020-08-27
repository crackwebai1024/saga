import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import Paper from '@material-ui/core/Paper';

import TableBody from './TableBody';
import Pagination from './Pagination';
import * as S from './styled';

const options = {
  pageCountOptions: [5, 10, 25],
  minPageCount: 5,
};

class List extends Component {
  state = {
    page: 0,
    pageCount: options.pageCountOptions[2],
  };

  componentDidMount() {
    const {
      actions,
      indicatorId,
      selector,
      countryId,
      projectId,
    } = this.props;
    const {
      page,
      pageCount,
    } = this.state;

    actions.getIndicatorDetailsListRequest({
      countryId,
      projectId,
      id: indicatorId,
      selector,
      page,
      pageCount,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      selector,
    } = this.props;
    const { selector: prevSelector } = prevProps;

    if (selector.period !== prevSelector.period || selector.value !== prevSelector.value) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        page: 0,
      }, this.dataUpdate);
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.resetIndicatorDetailsListData();
  }

  dataUpdate = () => {
    const {
      selector,
      actions,
      indicatorId,
      countryId,
      projectId,
    } = this.props;
    const {
      page,
      pageCount,
    } = this.state;

    actions.getIndicatorDetailsListRequest({
      countryId,
      projectId,
      id: indicatorId,
      selector,
      page,
      pageCount,
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    }, this.dataUpdate);
  };

  handleChangePageCount = (event) => {
    const pageCount = +event.target.value;

    this.setState({
      pageCount,
      page: 0,
    }, this.dataUpdate);
  };

  render() {
    const {
      listData: {
        columnNames,
        data,
        count,
      },
    } = this.props;

    const {
      page,
      pageCount,
    } = this.state;

    if (!columnNames || !data) {
      return null;
    }

    const emptyRows = options.minPageCount - Math.min(options.minPageCount, count - (page * pageCount));

    return (
      <Paper>
        <S.TableWrapper>
          <S.Table>
            <S.TableHead>
              <S.TableRow>
                {columnNames.map(({ propName, name }) => (
                  <S.TableCell key={propName}>{name}</S.TableCell>
                ))}
              </S.TableRow>
            </S.TableHead>
            <TableBody columns={columnNames} rows={data} emptyRows={emptyRows} />
          </S.Table>
        </S.TableWrapper>
        <Pagination
          rowsPerPageOptions={options.pageCountOptions}
          count={count}
          rowsPerPage={pageCount}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangePageCount}
        />
      </Paper>
    );
  }
}

List.propTypes = {
  indicatorId: PropTypes.string.isRequired,
  // connect
  selector: PropTypes.object.isRequired,
  countryId: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  listData: PropTypes.object.isRequired,
  actions: PropTypes.shape({
    getIndicatorDetailsListRequest: PropTypes.func.isRequired,
    resetIndicatorDetailsListData: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  indicatorDetails: {
    selector,
    listData,
  },
  country: {
    country,
    selectedProject,
  },
}) => ({
  selector,
  listData,
  countryId: country ? country.id : null,
  projectId: selectedProject ? selectedProject.id : null,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
