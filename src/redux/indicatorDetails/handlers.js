import moment from 'moment';
import getErrorMessage from 'helpers/getErrorMessage';
import { getCurrentYear } from 'helpers/getYears';
import { currentMonth } from 'helpers/getMonths';

const graphData = {
  valueType: '',
  data: [],
  target: {},
};

const mapData = {
  columnNames: [],
  items: [],
};

const initialState = {
  isLoading: false,
  graphData,
  listData: {},
  mapData,
  error: '',
  year: getCurrentYear(),
  month: currentMonth,
  selector: {
    period: 'all',
    value: moment(),
  },
  dateFrom: null,
  dateTo: null,
  indicatorData: {},
  updateLog: [],
};

export const getIndicatorDetailsGraphRequest = (state) => ({
  ...state,
  graphData: initialState.graphData,
  isLoading: true,
  error: '',
});

export const getIndicatorDetailsGraphSuccess = (state, { payload }) => ({
  ...state,
  graphData: payload,
  isLoading: false,
});

export const getIndicatorDetailsGraphFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getIndicatorDetailsListRequest = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});

export const getIndicatorDetailsListSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  listData: payload,
});

export const getIndicatorDetailsListFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const resetIndicatorDetailsListData = (state) => ({
  ...state,
  listData: initialState.listData,
});

export const getIndicatorDetailsMapRequest = (state) => ({
  ...state,
  mapData: initialState.mapData,
  isLoadingMap: true,
  error: '',
});

export const getIndicatorDetailsMapSuccess = (state, { payload }) => ({
  ...state,
  isLoadingMap: false,
  mapData: payload,
});

export const getIndicatorDetailsMapFailure = (state, { payload }) => ({
  ...state,
  isLoadingMap: false,
  error: getErrorMessage(payload),
});

export const setIndicatorDetailsReportingFilter = (state, { payload }) => {
  const newState = { ...state };
  if (payload && payload.filter) {
    newState.filter = payload.filter;
  }
  if (payload && payload.year) {
    newState.year = payload.year;
  }
  if (payload && payload.month) {
    newState.month = payload.month;
  }
  return newState;
};

export const setIndicatorDetailsReportingSelector = (state, { payload }) => ({
  ...state,
  selector: payload,
});

export const resetIndicatorData = (state) => ({
  ...state,
  indicatorData: {},
  error: '',
});

export const getIndicatorDataRequest = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});

export const getIndicatorDataSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  indicatorData: payload,
});

export const getIndicatorDataFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getIndicatorUpdateLogRequest = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});

export const getIndicatorUpdateLogSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  updateLog: payload,
});

export const getIndicatorUpdateLogFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getIndicatorHighlightsLogRequest = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});

export const getIndicatorHighlightsLogSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  indicatorData: {
    ...state.indicatorData,
    indicatorNotesChangeLog: payload,
  },
});

export const getIndicatorHighlightsLogFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});
export default initialState;
