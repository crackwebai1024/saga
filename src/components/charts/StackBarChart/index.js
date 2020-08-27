import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';

import getPraparedValueForShow from 'helpers/valueToShow';
import Legend from './Legend';
import * as S from './styled';
import { COLOR_SCALE } from './config';

const onActivated = (points) => { // remove tooltip labels with zero Y value and reverse tooltip labels
  let invalidPointIndex;

  do {
    invalidPointIndex = points.map((item) => item.y).indexOf(0);
    if (invalidPointIndex !== -1) {
      points.splice(invalidPointIndex, 1);
    }
  } while (invalidPointIndex !== -1);

  points.reverse();
};

const formatColorScale = (data) => {
  const colorPalette = data.colorPalette !== null
    ? COLOR_SCALE[data.colorPalette]
    : COLOR_SCALE.blue_cyan;
  let missingColorIndex = 0;

  const colorScale = data.data.reduce((acc, item) => {
    if (item.color) {
      acc.push(item.color);
    } else {
      acc.push(colorPalette[missingColorIndex % colorPalette.length]);
      missingColorIndex += 1;
    }

    return acc;
  }, []);

  return colorScale;
};

const formatVoronoiContainerLabels = ({ datum }) => {
  const label = `${datum.groupValue}: ${getPraparedValueForShow(datum.y)}`;

  // if (points.length > 8 || pointIndex === points.length - 1) {
  //   return label;
  // }

  return label; // label with new line
};

const getUniqXValues = (data) => {
  const xValuesMap = data
    .reduce((acc, item) => [...acc, ...item.data], [])
    .map((item) => item.x);

  const xUniqValues = [...new Set(xValuesMap)];

  return xUniqValues;
};

const getDomainPadding = (numberOfXValues) => {
  const k = 10;
  const xDefaultPadding = 70;

  let x = xDefaultPadding;

  if (numberOfXValues < 8) {
    x = xDefaultPadding * k / numberOfXValues;
  }

  return { x };
};

const StackBarChart = ({ data, t }) => {
  const colorScale = formatColorScale(data);
  const xUniqValues = getUniqXValues(data.data);

  if (!data.data.length) {
    return (
      <S.ChartContainer>
        <S.NoDataText>{t('common.no_data')}</S.NoDataText>
      </S.ChartContainer>
    );
  }

  return (
    <S.Container>
      <S.ChartContainer>
        <VictoryChart
          containerComponent={(
            <VictoryVoronoiContainer
              onActivated={onActivated}
              voronoiDimension="x"
              labelComponent={(
                <VictoryTooltip
                  flyoutStyle={S.inlineStyles.flyout}
                  pointerLength={5}
                />
              )}
              labels={formatVoronoiContainerLabels}
            />
          )}
          width={1200}
          height={290}
          padding={S.inlineStyles.chartPadding}
          domainPadding={getDomainPadding(xUniqValues.length)}
        >
          <VictoryAxis
            tickFormat={(tick) => tick}
            style={S.inlineStyles.axisStyle}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => getPraparedValueForShow(tick)}
            style={S.inlineStyles.axisStyle}
          />
          <VictoryStack
            colorScale={colorScale}
          >
            {data.data.map((chart, index) => (
              <VictoryBar
                barRatio={xUniqValues.length === 1 ? 6 : 0.3}
                data={chart.data}
                key={index}
                style={S.inlineStyles.bar(index, colorScale)}
              />
            ))}
          </VictoryStack>
        </VictoryChart>
      </S.ChartContainer>
      <Legend
        colorScale={colorScale}
        data={data.data.map((item) => ({ name: item.groupValue }))}
      />
    </S.Container>
  );
};

StackBarChart.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      y: PropTypes.number.isRequired,
    })).isRequired,
    target: PropTypes.shape({
      value: PropTypes.number.isRequired,
      year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
    valueType: PropTypes.string,
    colorPalette: PropTypes.string,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(StackBarChart);
