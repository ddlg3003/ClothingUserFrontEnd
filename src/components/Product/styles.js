import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  image: {
    height: '600px',
    marginBottom: '20px',
    width: '400px',
    borderRadius: '10px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
      height: '300px',
      width: '200px',
    },
  },
  links: {
    alignItems: 'center',
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
  title: {
    color: theme.palette.text.primary,
    textOverflow: 'ellipsis',
    width: '300px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    marginTop: '8px',
    marginBottom: 0,
    textAlign: 'center',
  },
}));
