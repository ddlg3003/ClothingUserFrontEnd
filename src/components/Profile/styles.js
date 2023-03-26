import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  emptyTabPanel: {
    marginTop: '-20px',
  },

  image: {
    borderRadius: '50%',
  },

  root: {
    display: 'flex',
    alignItems: 'stretch',
  },

  profileNav: {
    padding: '10px',
    width: '220px',
    color: 'black',
    margin: '10px',
    textAlign: 'center',
    lineHeight: '75px',
    display: 'block',
    flexShrink: '0',
    [theme.breakpoints.down('md')]: {
      width: '165px',
    },
  },

  profileMain: {
    margin: '10px',
    position: 'relative',
    flexGrow: '1',
    width: '900px',
    height: '600px',
    boxSizing: 'border-box',
    display: 'block',
    padding: '30px',
  },

  title: {
    // marginLeft:"70px",
    // marginBottom: "30px",
    fontSize: '25px',
    display: 'inline-block',
    padding: '10px 0',
  },

  titleTop: {
    letterSpacing: '2px',
    fontSize: '25px',
    fontWeight: 'normal',
    align: 'center',
    paddingBottom: '40px',
    paddingTop: '60px',
  },

  body: {
    marginBottom: '50px',
    // background: "#cfcfe1"
  },

  favoriteItems: {
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

  hidden: {
    display: 'none',
  },
  notHidden: {},
}));
