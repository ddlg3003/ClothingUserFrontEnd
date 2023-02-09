import React from 'react';
import Product from '../Product/Product';
import { Typography, Grid, Button } from '@mui/material';
import useStyles from './styles';

const Products = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      spacing={4}
      className={classes.productContainer}
    >
      {data?.map((product, i) => (
        <Product key={i} product={product} />
      ))}
    </Grid>
  );
};

export default Products;
