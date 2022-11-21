import React from 'react';
import Product from '../Product/Product';
import { Typography, Grid, Button } from '@mui/material'; 
import useStyles from './styles';

const Products = ({ data }) => {
    const classes = useStyles();

    return (
        <Grid container justifyContent="center" spacing={4} className={classes.productContainer}>
            {data.list.map((product) => (
                <Product key={product.id} product={product} />
            ))}
        </Grid>
    )
}

export default Products;