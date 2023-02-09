import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  links: {
    position: 'relative',
    fontWeight: 'bolder',
    textDecoration: 'none',
    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      flexDirection: 'column',
    },
    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.03)',
    },
  },
  image: {
    height: '600px',
    marginBottom: '10px',
    width: '400px',
    borderRadius: '10px',
    [theme.breakpoints.down('sm')]: {
      height: '300px',
      width: '200px',
    },
  },
  cateName: {
    padding: '20px',
    color: '#fff',
    borderRadius: '10px',
    width: '400px',
    backgroundColor: '#1a1a1a',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      width: '200px',
    },
  },
}));
