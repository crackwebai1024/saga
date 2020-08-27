import { inlineStylesBase } from '../styled';

export * from '../styled';

export const inlineStyles = {
  ...inlineStylesBase,
  targetLabel: {
    ...inlineStylesBase.targetLabel,
    textTransform: 'uppercase',
  },
};
