import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  slider: {
    paddingTop: '35%',
    background:
      'url("https://res.cloudinary.com/dgyqhnavx/image/upload/v1675237804/samples/ecommerce/Clothing%20assets/video_image-b9z3XOwdli_kxpguy.jpg") top center / cover no-repeat',
    position: 'relative',
  },
  container: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    width: '100%',
    zIndex: '1',
    transform: 'translateY(50%)',
    bottom: '50%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    '& svg': {
      fontSize: 60,
    },
    [theme.breakpoints.down('sm')]: {
      '& svg': {
        fontSize: 40,
      },
    },
  },
  slogan: {
    color: 'white',
    fontSize: '28px',
    position: 'absolute',
    top: 0,
    padding: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      padding: '12px',
    },
  },
}));
