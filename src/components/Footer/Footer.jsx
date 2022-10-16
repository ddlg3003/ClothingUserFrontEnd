import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import useStyles from './styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    const classes = useStyles();
    const logo = 'https://fontmeme.com/permalink/221015/466d5aeb7170191e34604da1b59fb9b2.png';

    const content = {
        'brand': { image: logo, width: 110 },
        'copy': '© 2022 ADNCloth.',
        'link1': 'FaceBook',
        'link2': 'Instagram',
        'link3': 'Twitter',
        'link4': 'Reddit'
      };
    
      let brand;
    
      if (content.brand.image) {
        brand = <img src={ content.brand.image } alt="" width={ content.brand.width } />;
      } else {
        brand = content.brand.text || '';
      }

    return (
        <>
        <Container maxWidth="md">
          <Box py={6} className={classes.rootBox}>
            <Link href="#" color="inherit" underline="none">
              <img src={logo} alt="ADNCloth" />
            </Link> 
            {/* <Link to="/"><img src={logo} /></Link> */}
            <Box component="nav" className={classes.footerNav}>
              
              <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}><FacebookIcon/></Link>
              <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}><InstagramIcon/></Link>
              <Link href="#" variant="body1" color="textPrimary" className={classes.footerLink}><TwitterIcon/></Link>
            </Box>
            <Typography color="textSecondary" component="p" variant="caption" gutterBottom={false}>{content['copy']}</Typography>
          </Box>
        </Container>
        </>
    )
}

export default Footer;