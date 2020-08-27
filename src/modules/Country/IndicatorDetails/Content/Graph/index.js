import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { bindActionCreators } from 'redux';

import { actions as actionsIndicatorDetails } from 'redux/indicatorDetails';
import isEqual from 'lodash/isEqual';

import BarChart from 'components/charts/BarChart';
import LineChart from 'components/charts/LineChart';
import BarAndLineChart from 'components/charts/BarAndLineChart';
import StackBarChart from 'components/charts/StackBarChart';
import sort from 'components/charts/helpers/sort';
import Legend from 'components/Legend';
import * as commonChartProps from 'components/charts/helpers';
import { getMonthYearFormatDate, getFormatedDateTime } from 'helpers/formatDate';
import { updateLinkToLogPage } from 'helpers/navigation';
import Select from './Select';
import * as S from './styled';
import { formatStackBarData } from './formatters';

const values = [
  {
    name: 'Name (A-Z)',
    key: 'az',
  },
  {
    name: 'Name (Z-A)',
    key: 'za',
  },
  {
    name: 'Value (0-100)',
    key: 'vup',
  },
  {
    name: 'Value (100-0)',
    key: 'vdown',
  },
];

class Chart extends Component {
  state = {
    selectedSorting: 'vup',
    graphData: {},
  }

  componentDidMount() {
    this.fetchGraphData();
    if (this.props.page === 'graph') {
      const graphContainer = window.document.getElementById('graph');
      const rect = graphContainer.getBoundingClientRect();
      window.scrollTo(rect.x, rect.y - 31);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      selector,
      graphData,
    } = this.props;

    if (selector.period !== prevProps.selector.period || selector.value !== prevProps.selector.value) {
      this.fetchGraphData();
    }

    if (!isEqual(graphData, prevProps.graphData)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ graphData });
    }
  }

  fetchGraphData = () => {
    const {
      actions,
      indicatorId,
      selector,
      countryId,
      projectId,
    } = this.props;
    actions.getIndicatorDetailsGraphRequest({
      countryId,
      projectId,
      id: indicatorId,
      selector,
    });
  }

  getChart = (gData) => {
    const graphData = Object.keys(gData).length > 0
      ? { ...gData, data: sort(this.state.selectedSorting, gData.data) }
      : gData;
    switch (true) {
      case (graphData?.hasSecondaryGrouping && graphData?.chartViewType === 'bar'):
        return <StackBarChart data={formatStackBarData(graphData)} />;
      case (!graphData?.hasSecondaryGrouping && graphData?.chartViewType === 'barplusline'):
        return (
          <BarAndLineChart data={graphData} {...commonChartProps} />
        );
      case (!graphData?.hasSecondaryGrouping && graphData?.chartViewType === 'line'):
        return (
          <LineChart data={graphData} {...commonChartProps} />
        );
      case (!graphData?.hasSecondaryGrouping && graphData?.chartViewType === 'bar'):
        return (
          <BarChart data={graphData} {...commonChartProps} />
        );
      default:
        return null;
    }
  }

  onChange = (selectedSorting) => {
    this.setState({ selectedSorting });
  }

  render() {
    const {
      selectedSorting, graphData,
    } = this.state;
    const {
      selectedProject, t,
    } = this.props;

    return (
      <S.Container id="graph">
        <S.SectionTitle>
          {selectedProject.name} <span>{`(${getMonthYearFormatDate(selectedProject.updatedAt)})`}</span>
        </S.SectionTitle>
        <S.Legend>
          <Legend values={graphData.statusMilestones} isPositive={graphData.isPositiveProgress} />
          {!graphData?.hasSecondaryGrouping && (
            <S.Select>
              <Select
                onChange={this.onChange}
                items={values}
                selected={selectedSorting}
                name="sorting"
                title="Sorting"
              />
            </S.Select>
          )}
        </S.Legend>
        <S.Content>
          {this.getChart(graphData)}
        </S.Content>
        { graphData && graphData.lastUpdated && (
          <S.LastUpdateNote>
            {`${t('country.updated_at')}  `}
            <S.UpdateLogLink to={(location) => updateLinkToLogPage(`${location.pathname}`)}>
              {
                graphData.lastUpdated.time ? `${getFormatedDateTime(graphData.lastUpdated.time)}`
                  : `${getFormatedDateTime(selectedProject.updatedAt)}`
              }
            </S.UpdateLogLink>
            {` by ${graphData.lastUpdated.name}`}
          </S.LastUpdateNote>
        )}
        {/* <S.SourceNote>
          {`${t('country.source')}: `}
        </S.SourceNote> */}
      </S.Container>
    );
  }
}

Chart.propTypes = {
  actions: PropTypes.shape({
    getIndicatorDetailsGraphRequest: PropTypes.func.isRequired,
  }).isRequired,
  countryId: PropTypes.number.isRequired,
  projectId: PropTypes.number.isRequired,
  graphData: PropTypes.object.isRequired,
  indicatorId: PropTypes.string.isRequired,
  page: PropTypes.string,
  selector: PropTypes.object.isRequired,
  selectedProject: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

Chart.defaultProps = {
  page: undefined,
};

const mapStateToProps = ({
  indicatorDetails: {
    graphData,
    selector,
  },
  country: {
    country,
    selectedProject,
  },
}) => ({
  graphData,
  selector,
  countryId: country ? country.id : null,
  projectId: selectedProject ? selectedProject.id : null,
  selectedProject,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...actionsIndicatorDetails,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(Chart));
