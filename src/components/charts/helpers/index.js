import getPraparedValueForShow from 'helpers/valueToShow';

export const domainPadding = ({ data }) => (data.length > 2 ? { x: 40 } : { x: 240 });

export const getMaxDomain = ({ data, target = {} }) => {
  let maxDomain = 0;

  const newData = [...data.map((i) => i.y)];

  if (target && target.value) {
    newData.push(target.value);
  }

  if (newData.length) {
    maxDomain = Math.max(...newData);
  }

  if (maxDomain === 0) { maxDomain = 1; }

  return 1.3 * maxDomain;
};

export const formatXAxis = ({ data }) => data
  .map((value, index) => (typeof value.x === 'string' ? index : value.x));

export const getTargetLabel = (data) => {
  const { target, valueType } = data;
  const valueUnits = valueType === '%' ? '%' : '';
  const targetValue = `${getPraparedValueForShow(target.value)}${valueUnits}`;

  return [`${targetValue}`];
};

export const formatTick = (tick) => {
  if (tick.length > 9) {
    return `${tick.substr(0, 7)}...`;
  }

  return tick;
};

export const formatVoronoiContainerLabels = ({ datum }) => {
  const label = `${datum.xName}\n \n ${datum.y}`;

  if (datum.childName.includes('chart-scatter')) {
    return null;
  }

  return `${label}`;
};

export const getWidthTooltip = ({ datum }) => {
  const lengthDataY = String(datum.y).length;
  const lengthDataX = datum.xName.length;

  if (lengthDataY < 3 && lengthDataX < 3) { return 3 * 7.5; }

  return lengthDataX <= lengthDataY ? lengthDataY * 7.5 : lengthDataX * 7.5;
};
