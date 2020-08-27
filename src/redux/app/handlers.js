const initialState = {
  idForDeletion: 0,
  isConfirmModalOpen: false,
  drawerOpen: false,
};

export const setConfirmModalState = (state, { payload }) => ({
  ...state,
  isConfirmModalOpen: payload.state,
  idForDeletion: payload.id,
});

export const openDrawerMenu = (state) => ({
  ...state,
  drawerOpen: true,
});

export const closeDrawerMenu = (state) => ({
  ...state,
  drawerOpen: false,
});

export default initialState;
