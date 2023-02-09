import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  rootBox: {
    // position: 'absolute',
    // left: '0',
    // bottom: '0',
    // right: '0',
    padding: '30px',
    backgroundColor: 'black',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },

  footerNav: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    // marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(0),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginLeft: 'auto',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },

  footerLink: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(3),
    paddingRight: '10px',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(2),
    },
  },
}));
