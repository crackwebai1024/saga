import { createMuiTheme } from '@material-ui/core/styles';
import { getIsInternetExplorer } from 'services/browser';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
    indicatorIconFontSize: '36px',
  },
  palette: {
    text: {
      primary: '#27323e',
    },
    primary: {
      main: '#003870',
    },
    secondary: {
      main: '#27323e',
    },
  },
});

const baseTheme = (countryTheme) => ({
  isInternetExplorer: getIsInternetExplorer(),
  layout: {
    contentMaxWidth: '1440px',
    contentPadding: '0 40px',
    indicatorCardSize: '261px',
    indicatorCardHeight: '178px',
  },
  colors: {
    appBackground: '#ffffff',
    black: 'rgba(0, 0, 0, 0.87)',
    borderGray: '#d8d8d8',
    tableBorder: '#cccccc',
    cardBorderGray: 'rgba(38, 50, 62, 0.25)',
    darkGray: '#6e6e6e',
    darkGreen: '#008000',
    error: '#d0021b',
    footerGray: '#9ea3a9',
    gray: '#acafb1',
    grayWhite: '#8f8f8f',
    green: '#10a44a',
    filterBackground: '#f7f7f7',
    filterBorder: '#979797',
    lightGray: '#f5f8fa',
    lineGraphBackground: '#d7f1fc',
    lineGraphGray: '#b9b9b9',
    lightBlue: '#1E88E5',
    toggleGray: '#F6F8F9',
    toggleTextGray: '#27323e',
    orange: '#ff9800',
    pieChartDefaultSector: '#f1f1f1',
    primaryBlue: '#329bdb',
    primaryDark: '#27323e',
    primaryDarkBlue: '#003870',
    primaryLightBlue: '#89bee0',
    primaryWhite: '#ffffff',
    primaryDefault: '#efb341',
    purple: '#4a3b75',
    red: '#ee0000',
    redDark: '#db6767',
    statusGray: '#a8adb2',
    statusRed: '#f81501',
    tableGray: '#e5e5e5',
    logGray: '#a6a6a6',
    tableBorderGray: '#b1b1b1',
    selectedCellTableBlue: '#dfedf8',
    atRiskOrange: '#f98722',
    statusYellow: '#feff00',
    statusGreen: '#2bb050',
    yellow: '#dfd020',
    labelColor: '#212121',
  },
  ...muiTheme,
  countryTheme,
});

export default baseTheme;

export const colorOptions = {
  Global: {
    mainColor: '#003870',
    buttonMainColor: '#002C57',
    fontMainColor: '#FFFFFF',
  },
  Red: {
    mainColor: '#DB8476',
    buttonMainColor: '#DB6A5A',
    fontMainColor: '#FFFFFF',
  },
  Green: {
    mainColor: '#3F9E6C',
    buttonMainColor: '#30915E',
    fontMainColor: '#FFFFFF',
  },
  'Dark blue': {
    mainColor: '#677FC9',
    buttonMainColor: '#4966B9',
    fontMainColor: '#FFFFFF',
  },
  Blue: {
    mainColor: '#3D87E0',
    buttonMainColor: '#2973CC',
    fontMainColor: '#FFFFFF',
  },
  'Pale blue': {
    mainColor: '#AEE9F2',
    buttonMainColor: '#90E0F0',
    fontMainColor: '#000000',
  },
  'Light grey': {
    mainColor: '#E5E5E5',
    buttonMainColor: '#D6D6D6',
    fontMainColor: '#000000',
  },
  'Dark grey': {
    mainColor: '#808080',
    buttonMainColor: '#666666',
    fontMainColor: '#FFFFFF',
  },
  Yellow: {
    mainColor: '#FFC800',
    buttonMainColor: '#E5B400',
    fontMainColor: '#000000',
  },
  Orange: {
    mainColor: '#F97F01',
    buttonMainColor: '#CF6900',
    fontMainColor: '#FFFFFF',
  },
};
