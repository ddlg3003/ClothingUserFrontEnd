import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Category = () => {
    const classes = useStyles();
 
    return (
        <Grid item>
            <Link to="/" className={classes.links}>
            <Typography fontWeight="500" position="absolute" className={classes.cateName} align="center" fontSize="20px">Thời trang nam</Typography>                <img 
                    src={'https://cdn.shopify.com/s/files/1/2290/7887/products/F0217103619_2_ba577132-c0b1-4dcf-937c-a601b4560278.jpg?v=1660566069'}
                    className={classes.image}
                />
            </Link>
        </Grid>  
  )
}

export default Category;