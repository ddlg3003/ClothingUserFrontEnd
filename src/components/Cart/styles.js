import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  totalText: {
    marginRight: '70px',
    [theme.breakpoints.down('md')]: {
      marginRight: '20px',
    },
  },

  inputField: {
    width: '55px',
    padding: '10px',
    fontSize: '18px',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      width: '45px',
    },
  },

  checkoutButton: {
    marginRight: '380px!important',
    color: 'white!important',
    backgroundColor: 'black!important',
    paddingRight: '50px!important',
    paddingLeft: '50px!important',
    paddingTop: '14px!important',
    paddingBottom: '14px!important',
    [theme.breakpoints.down('md')]: {
      marginRight: '10px!important',
    },
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '40px',
    marginBottom: '40px',
  },

  removeItemButton: {
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.5',
    },
  },

  itemName: {
    verticalAlign: 'top',
    marginLeft: '10px',
  },

  itemsTable: {
    minWidth: '650px',
  },

  itemLink: {
    alignItems: 'left',
    fontWeight: 'bolder',
    textDecoration: 'none',
    position: 'relative',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
