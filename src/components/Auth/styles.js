import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  helperText: {
    '& .MuiFormHelperText-root': {
      height: '0',
      marginTop: '0',
      marginLeft: '-1px',
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    margin: '100px 160px',
    [theme.breakpoints.down('sm')]: {
      margin: '100px 16px',
    },
  },
  form: {
    width: '90%', // Fix IE 11 issue.
    marginTop: theme.spacing(4),
  },
  divider: {
    margin: '20px 0',
  },
  otherLogin: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  options: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    color: 'black',
    textDecoration: 'none',
  },
  register: {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
