import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  VictoryAxis,
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

class LineChart extends Component {
  state = {
    width: null,
  }

  containerRef = React.createRef();

  componentDidMount() {
    this.setState({ width: this.getWidth() });
  }

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
                    width={getWidthTooltip}
                  />
                )}
                labels={formatVoronoiContainerLabels}
              />
            )}
            padding={S.inlineStyles.chartPadding}
            domainPadding={domainPadding(data)}
            maxDomain={{ y: getMaxDomain(data) }}
            minDomain={data.data.length === 1 ? { y: 0 } : null}
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
            <VictoryLine
              data={data.data}
              style={S.inlineStyles.lineChartStyle}
              labelComponent={<VictoryLabel style={S.inlineStyles.targetLabel} />}
            />
            <VictoryScatter
              data={data.data}
              style={S.inlineStyles.scatterStyle(data.data.length)}
              labelComponent={<VictoryLabel dy={25} />}
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

LineChart.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      y: PropTypes.number.isRequired,
    })).isRequired,
    target: PropTypes.shape({
      value: PropTypes.number.isRequired,
      year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }).isRequired,
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

export default withTranslation()(LineChart);
