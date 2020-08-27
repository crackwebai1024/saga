import { colorOptions } from '../../theme';

const initialState = {
  colors: colorOptions.Global,
};

export const setTheme = (state, { payload }) => ({
  ...state,
  colors: payload,
});

export default initialState;
