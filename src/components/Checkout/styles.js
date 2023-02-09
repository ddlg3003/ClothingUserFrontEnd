import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  totalText: {
    marginRight: '70px',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: '40px',
    marginBottom: '40px',
  },

  itemName: {
    verticalAlign: 'top',
    marginLeft: '10px',
  },

  addressBox: {
    marginBottom: '20px',
    verticalAlign: 'top',
    padding: '25px',
  },

  TableContainer: {
    padding: '25px',
  },

  paymentTypeBox: {
    marginTop: '30px',
    marginBottom: '20px',
    verticalAlign: 'top',
    padding: '25px',
  },

  checkoutButton: {
    color: 'white!important',
    backgroundColor: 'black!important',
    paddingRight: '50px!important',
    paddingLeft: '50px!important',
    paddingTop: '14px!important',
    paddingBottom: '14px!important',
  },

  paymentContainer: {
    marginTop: '30px',
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
