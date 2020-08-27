const initialState = {
  isOpen: false,
};

export const setLoaderState = (state, { payload }) => ({
  ...state,
  isOpen: payload,
});

export default initialState;
