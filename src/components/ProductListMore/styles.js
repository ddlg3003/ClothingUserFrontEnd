import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    margin: '40px 0 120px 0',
    position: 'relative',
  },
  pagination: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    paddingTop: '40px',
    // width: '100%',
  },
}));
