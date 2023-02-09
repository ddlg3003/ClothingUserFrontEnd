import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  cateContainer: {
    margin: '60px 20px 100px',
    [theme.breakpoints.down('sm')]: {
      marginTop: '30px',
    },
  },
}));
