import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  toolbar: {
    margin: '0 100px',
    height: '70px',
    borderBottom: '1px solid #dedede',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      margin: '0',
    },
  },
  search: {
    position: 'relative',
    marginLeft: '64px',
    width: '40%',
    [theme.breakpoints.down('md')]: {
      width: '40%',
      marginLeft: '40px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '30%',
      marginLeft: '0',
    },
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
  },
  hoverPaper: {
    zIndex: 2,
    // display: 'none',
  },
  popOverRoot: {
    pointerEvents: 'none',
  },
  // navButton: {
  //     width: 'auto',
  //     height: '62px',
  // },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: '240px',
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: '240px',
  },
  responsiveLogo: {
    display: 'flex',
    justifyContent: 'center',
  },
  dropdown: {
    [theme.breakpoints.down('800')]: {
      marginLeft: '16px',
    },
  },
  productSearchItem: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
}));
