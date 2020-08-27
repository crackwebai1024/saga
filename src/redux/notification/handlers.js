const initialState = {
  notifications: [], // contains the list of notifications
};

export const addNotification = (state, { payload }) => ({
  notifications: [...state.notifications, { ...payload, key: new Date().getTime() + Math.random() }],
});

export const removeNotification = (state, { payload }) => ({
  ...state,
  notifications: state.notifications.filter((notification) => notification.key !== payload), // remove notification from the list for given key
});

export default initialState;
