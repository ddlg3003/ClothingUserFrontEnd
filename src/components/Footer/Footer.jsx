import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import useStyles from './styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const classes = useStyles();
    const logo = 'https://fontmeme.com/permalink/221016/0904f554131fbb26609e131d851031a4.png?fbclid=IwAR0arYmZn4xlsq0mSYQ2nGP5qIAm4aXMe_D1TZPw1HcnjrCczz3QX71si5o';

    return (
        <>
        <Container disableGutters maxWidth={false} >
          <Box className={classes.rootBox}>
            <Link href="#" color="inherit" underline="none">
              <img src={logo} alt="ADNCloth" width='110'  />
            </Link> 
            <Box component="nav" className={classes.footerNav}>
              <Link href="#" color="textPrimary" className={classes.footerLink} style={{ color: '#fff' }}><FacebookIcon/></Link>
              <Link href="#" color="textPrimary" className={classes.footerLink} style={{ color: '#fff' }}><InstagramIcon/></Link>
              <Link href="#" color="textPrimary" className={classes.footerLink} style={{ color: '#fff' }}><TwitterIcon/></Link>
            </Box>
            <Typography style={{ color: '#fff' }} component="p" variant="caption" gutterBottom={false}>©2022 ADNCloth.</Typography>
          </Box>
        </Container>
        </>
    )
}

export default Footer;