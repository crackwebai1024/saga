import { inlineStylesBase } from '../styled';

export * from '../styled';

export const inlineStyles = {
  ...inlineStylesBase,
  targetLabel: {
    ...inlineStylesBase.targetLabel,
    textTransform: 'uppercase',
  },
  lineChartStyle: {
    data: { stroke: '#054478', strokeWidth: 1 },
    labels: { fill: '#000000', fontFamily: 'Axiforma, sans-serif', fontSize: 7 },
  },
  scatterStyle: (itemsCount) => ({
    ...inlineStyles.scatterStyle,
    data: itemsCount === 1 ? { fill: '#054478' } : { fill: 'transparent' },
  }),
};
