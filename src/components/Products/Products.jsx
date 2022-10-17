import React from 'react';
import Product from '../Product/Product';
import useStyles from './styles';
import { Typography, Grid, Button } from '@mui/material'; 

const Products = ({  }) => {
    
    const classes = useStyles();
    return (
        <Grid container justifyContent="center" spacing={4} className={classes.productContainer}>
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </Grid>
    )
}

export default Products;