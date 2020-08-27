const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
    marginTop: '144px',
    [theme.breakpoints.down(1024)]: {
      marginTop: '100px',
    },
    '@media print': {
      marginTop: '144px',
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#27323e',
    boxShadow: 'none',
    '@media print': {
      position: 'absolute',
      colorAdjust: 'exact',
    },
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: '0 12px',
    display: 'flex',
  },
  hide: {
    display: 'none',
  },
  header: {
    height: '80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'inherit',
    maxWidth: '1334px',
    margin: '0 auto',
    [theme.breakpoints.down(1024)]: {
      flexDirection: 'column',
      height: '115px',
    },
    '@media print': {
      flexDirection: 'row',
      height: '80px',
    },
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.up(1024)]: {
      display: 'none',
    },
  },
  drawerOpen: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflow: 'hidden',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflow: 'hidden',
    overflowX: 'hidden',
    width: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    minHeight: '100px',
    [theme.breakpoints.up(600)]: {
      minHeight: '100px',
    },
  },
  logo: {
    height: '55px',
    margin: '10px',
    [theme.breakpoints.down(1024)]: {
      height: '40px',
    },
    [theme.breakpoints.down(600)]: {
      height: 'auto',
      width: 'calc(100% - 100px)',
      maxWidth: '400px',
      marginLeft: '0',
    },
    [theme.breakpoints.down(400)]: {
      height: 'auto',
      width: 'calc(100% - 150px)',
      maxWidth: '320px',
      marginLeft: '0',
    },
    '@media print': {
      height: '55px',
      margin: '10px',
      maxWidth: 'unset',
      width: 'auto',
    },
  },
  content: {
    flexGrow: 1,
    maxWidth: 1334,
    width: '100%',
    padding: theme.spacing(3),
    minHeight: '700px',
    margin: '0 auto',
  },
  leftHeaderBlock: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down(1024)]: {
      justifyContent: 'flex-start',
      width: '100%',
    },
    '@media print': {
      width: 'auto',
    },
  },
  rightHeaderBlock: {
    display: 'flex',
    alignItems: 'center',
  },
  menuList: {
    minWidth: drawerWidth - 10,
  },
  primaryMenuItem: {
    height: '50px',
    padding: '0 16px',
    margin: '8px 0',
    '&>div>span': {
      fontSize: '18px',
      color: '#27323e',
      lineHeight: '25px',
      whiteSpace: 'normal',
    },
  },
  menuItemIcon: {
    margin: '0 8px',
  },
  secondaryMenu: {
    padding: '0',
  },
  secondaryMenuItem: {
    padding: '10px 10px 10px 72px',
    '&:hover': {
      background: 'none',
    },
    '&:hover >div>span': {
      color: 'rgb(38, 50, 62, 0.8)',
    },
    '&>div>span': {
      fontSize: '14px',
      color: 'rgb(38, 50, 62, 0.5)',
    },
  },
  currentLink: {
    '&>div>span, >div>svg': {
      color: '#2F92CE',
    },
  },
});

export default styles;
