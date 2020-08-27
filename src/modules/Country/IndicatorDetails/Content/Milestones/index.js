import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import { withTranslation } from 'react-i18next';

import { actions as milestonesActions } from 'redux/milestones';
import ToggleButtonGroup from 'components/material/ToggleButtonGroup';
import Timeline from 'components/Timeline';

import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';
import PieChart from './PieChart';
import UpcomingMilestones from './UpcomingMilestones';
import * as S from './styled';

import { toggleViewItems, columns } from './config';

class Milestones extends Component {
  state = {
    view: toggleViewItems[0].value,
    order: 'asc',
    orderBy: 'name',
    rowsPerPage: 10,
    page: 0,
  }

  static propTypes = {
    milestones: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    indicatorsGroupId: PropTypes.number.isRequired,
    countryId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    graphData: PropTypes.array.isRequired,
    upcoming: PropTypes.array.isRequired,
    actions: PropTypes.shape({
      getMilestonesGraphRequest: PropTypes.func.isRequired,
      getUpcomingMilestonesRequest: PropTypes.func.isRequired,
    }).isRequired,
    selectedPeriod: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    sectionId: PropTypes.string,
    indicatorId: PropTypes.string,
  }

  static defaultProps = {
    sectionId: undefined,
    indicatorId: undefined,
  }

  componentDidMount() {
    const {
      match,
      id,
      indicatorsGroupId,
      countryId,
      projectId,
      actions,
      sectionId,
      indicatorId,
    } = this.props;

    const params = {
      sectionId: +match.params.sectionId || sectionId,
      indicatorId: id || indicatorId,
      indicatorsGroupId,
      countryId,
      projectId,
    };

    actions.getMilestonesGraphRequest(params);
    actions.getUpcomingMilestonesRequest(params);
  }

  onToggleChange = (value) => this.setState({ view: value });

  handleRequestSort = (event, property) => {
    const isAsc = this.state.orderBy === property && this.state.order === 'asc';
    this.setState({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    });
  };

  descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  getComparator = (order, orderBy) => {
    if (order === 'desc') {
      return (a, b) => this.descendingComparator(a, b, orderBy);
    }
    return (a, b) => -this.descendingComparator(a, b, orderBy);
  }

  stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  render() {
    const {
      milestones,
      title,
      graphData,
      upcoming,
      selectedPeriod,
      match,
      t,
    } = this.props;

    const {
      view,
      order,
      orderBy,
      rowsPerPage,
      page,
    } = this.state;

    const milestonesSorted = this.stableSort(milestones, this.getComparator(order, orderBy));
    const isMilestonePage = match.url.indexOf('/milestones') !== -1;

    return (
      <S.Container>
        {!isMilestonePage && (
          <S.MilestoneTitle>Milestones</S.MilestoneTitle>
        )}
        <S.TopRow>
          <S.TopRowItem>
            <PieChart
              data={graphData}
              period={t(`country.filter.${selectedPeriod.period}`)}
              isMilestonePage={isMilestonePage}
            />
          </S.TopRowItem>
          <S.TopRowItem>
            <UpcomingMilestones data={upcoming} />
          </S.TopRowItem>
        </S.TopRow>
        <ToggleButtonGroup
          value={view}
          onChange={this.onToggleChange}
          items={toggleViewItems}
        />
        <S.Content>
          {view === 'details' && (
            <S.TableWrapper>
              <S.StyledTable aria-labelledby="tableTitle">
                <Header
                  headRows={columns}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                />
                <Body
                  rows={milestonesSorted.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage)}
                  isLoading={milestones.length === 0}
                />
              </S.StyledTable>
              <Pagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={milestones.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </S.TableWrapper>
          )}
          {view === 'timeline' && (
            <Timeline milestones={milestones} indicatorTitle={title} />
          )}
        </S.Content>
      </S.Container>
    );
  }
}

const mapStateToProps = ({
  indicatorDetails: {
    indicatorData: {
      id,
      indicatorsGroupId,
      title,
      indicatorsMilestones: milestones,
    },
    selector,
  },
  country: {
    country: {
      id: countryId,
    },
    selectedProject: {
      id: projectId,
    },
  },
  milestones: {
    graphData,
    upcoming,
  },
}) => ({
  milestones,
  title,
  id,
  indicatorsGroupId,
  countryId,
  projectId,
  graphData,
  upcoming,
  selectedPeriod: selector,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...milestonesActions,
  }, dispatch),
});

export default compose(
  withSnackbar,
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withTranslation(),
)(Milestones);
