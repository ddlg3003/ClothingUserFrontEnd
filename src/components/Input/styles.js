import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  helperText: {
    '& .MuiFormHelperText-root': {
      height: '0',
      marginTop: '0',
      marginLeft: '-1px',
    },
  },
}));
