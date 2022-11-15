import React from 'react';
import Products from '../Products/Products';
import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import { useGetProductsQuery } from '../../services/clothing';
import useStyles from './styles';

const ProductListMore = () => {
    const classes = useStyles();
    const { data, isFetching } = useGetProductsQuery(); 

    return (
        <div className={classes.container}>
            {                 
                isFetching ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress color="black" size="4rem" />
                    </Box>
                ) : (
                    <Products data={data} />
                )
            }
            <Stack spacing={2} className={classes.pagination}>
                <Pagination count={10} shape="rounded" size="large" />
            </Stack>
        </div>
    )
}

export default ProductListMore;