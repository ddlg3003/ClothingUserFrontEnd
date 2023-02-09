import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    padding: '40px 120px',
    [theme.breakpoints.down('md')]: {
      padding: '40px 12px',
    },
  },
  image: {
    height: '800px',
    width: '550px',
    borderRadius: '12px',
    [theme.breakpoints.down('md')]: {
      height: '650px',
      width: '450px',
    },
    [theme.breakpoints.down('sm')]: {
      height: '440px',
      width: '300px',
    },
    '&:hover': {
      cursor: 'pointer',
    },
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '6px',
  },
  colorItem: {
    width: '45px',
    height: '45px',
    marginRight: '6px',
    borderRadius: '4px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  sizeItem: {
    background: '#d9d9d9',
    width: '80px',
    height: '40px',
    marginRight: '6px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  disableSizeItem: {
    background: '#a0a0a0',
    width: '80px',
    height: '40px',
    marginRight: '6px',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    alignItems: 'center',
    '&:hover': {
      cursor: 'not-allowed',
    },
  },
  input: {
    width: '80px',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundcolor: 'red',
    },
  },
  subImageContainer: {
    zIndex: 2,
    position: 'absolute',
    top: '32px',
    left: '32px',
    display: 'flex',
    flexDirection: 'column',
    width: '8%',
  },
  subImage: {
    border: '1px solid #a4a4a4',
    marginBottom: '4px',
    borderRadius: '6px',
    opacity: '0.5',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  commentList: {
    width: '860px',
    [theme.breakpoints.down('914')]: {
      width: '500px',
    },
    [theme.breakpoints.down('md')]: {
      width: '400px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },
}));
