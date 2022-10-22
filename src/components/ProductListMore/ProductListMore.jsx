import React from 'react';
import Products from '../Products/Products';
import { Pagination, Stack } from '@mui/material';
import useStyles from './styles';

const ProductListMore = () => {
    const classes = useStyles();


    return (
        <div className={classes.container}>
            <Products />
            <Stack spacing={2} className={classes.pagination}>
                <Pagination count={10} shape="rounded" size="large" />
            </Stack>
        </div>
    )
}

export default ProductListMore;