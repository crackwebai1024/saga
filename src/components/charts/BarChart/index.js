import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
  createContainer,
} from 'victory';

import { getRoundedValue } from 'helpers/valueToShow';
import * as S from './styled';

const VictoryZoomVoronoiContainer = createContainer('zoom', 'voronoi');

class BarChart extends Component {
  state = {
    width: null,
  }

  containerRef = React.createRef();

  componentDidMount() {
    this.setState({ width: this.getWidth() });
  }

  getLabelPoint = ({ data, target, valueType }) => data
    .map((value) => ({
      ...value,
      y: value.y + (this.props.getMaxDomain({ data, target }) * 0.05),
      label: valueType === '%'
        ? `${getRoundedValue(value.y)}${valueType}`
        : `${getRoundedValue(value.y)}`,
    }));

  getWidth = () => this.containerRef.current?.clientWidth / 1.9;

  render() {
    const {
      data,
      t,
      domainPadding,
      getMaxDomain,
      formatXAxis,
      getTargetLabel,
      formatTick,
      formatVoronoiContainerLabels,
      getWidthTooltip,
    } = this.props;

    return (
      <S.BarContainer ref={this.containerRef}>
        {data.data.length && this.state.width ? (
          <VictoryChart
            width={this.state.width}
            containerComponent={(
              <VictoryZoomVoronoiContainer
                voronoiBlacklist={['target']}
                voronoiDimension="x"
                labelComponent={(
                  <VictoryTooltip
                    flyoutStyle={S.inlineStyles.flyout}
                    pointerLength={5}
                    flyoutWidth={getWidthTooltip}
                  />
                )}
                labels={formatVoronoiContainerLabels}
              />
            )}
            padding={S.inlineStyles.chartPadding}
            domainPadding={domainPadding(data)}
            maxDomain={{ y: getMaxDomain(data) }}
          >
            <VictoryAxis
              crossAxis
              standalone={false}
              tickValues={formatXAxis(data)}
              tickFormat={formatTick}
              style={S.inlineStyles.horizontalAxisStyle(data.data.length)}
            />
            <VictoryAxis
              dependentAxis
              crossAxis
              tickFormat={(value) => getRoundedValue(value)}
              standalone={false}
              style={S.inlineStyles.verticalAxisStyle}
            />
            <VictoryBar
              data={data.data}
              barRatio={data.data.length === 1 ? 6 : 0.4}
              style={S.inlineStyles.barChartStyle}
            />
            <VictoryScatter
              data={this.getLabelPoint(data)}
              style={S.inlineStyles.scatterStyle}
              labelComponent={<VictoryLabel dy={5} />}
            />
            {data.target && (
              <VictoryLine
                name="target"
                minDomain={{ x: -5 }}
                y={() => data.target.value}
                style={S.inlineStyles.targetLine}
                labels={getTargetLabel(data)}
                labelComponent={<VictoryLabel style={S.inlineStyles.targetLabel} />}
              />
            )}
          </VictoryChart>
        ) : <S.NoDataText>{t('common.no_data')}</S.NoDataText>}
      </S.BarContainer>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      y: PropTypes.number.isRequired,
      status: PropTypes.string,
    })).isRequired,
    target: PropTypes.shape({
      value: PropTypes.number.isRequired,
      year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
    valueType: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
  domainPadding: PropTypes.func.isRequired,
  getMaxDomain: PropTypes.func.isRequired,
  formatXAxis: PropTypes.func.isRequired,
  getTargetLabel: PropTypes.func.isRequired,
  formatTick: PropTypes.func.isRequired,
  formatVoronoiContainerLabels: PropTypes.func.isRequired,
  getWidthTooltip: PropTypes.func.isRequired,
};

export default withTranslation()(BarChart);
