import React from 'react';
import { WHITE_LOGO } from '../../utils/globalVariables';
import { Container, Typography, Box, Link } from '@mui/material';
import useStyles from './styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  const classes = useStyles();
  const logo = WHITE_LOGO;

  return (
    <>
      <Container
        disableGutters
        maxWidth={false}
        sx={{ position: 'absolute', bottom: 0 }}
      >
        <Box className={classes.rootBox}>
          <Link href="#" color="inherit" underline="none">
            <img src={logo} alt="ADNCloth" width="110" />
          </Link>
          <Box component="nav" className={classes.footerNav}>
            <Link
              href="#"
              color="textPrimary"
              className={classes.footerLink}
              style={{ color: '#fff' }}
            >
              <FacebookIcon />
            </Link>
            <Link
              href="#"
              color="textPrimary"
              className={classes.footerLink}
              style={{ color: '#fff' }}
            >
              <InstagramIcon />
            </Link>
            <Link
              href="#"
              color="textPrimary"
              className={classes.footerLink}
              style={{ color: '#fff' }}
            >
              <TwitterIcon />
            </Link>
          </Box>
          <Typography
            style={{ color: '#fff' }}
            component="p"
            variant="caption"
            gutterBottom={false}
          >
            ©2023 ADNCloth.
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Footer;
