import React, { useState } from 'react';
import Products from '../Products/Products';
import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import { useGetProductsQuery } from '../../services/clothing';
import { useSearchParams } from 'react-router-dom';
import { LIMIT } from '../../utils/globalVariables';
import useStyles from './styles';

const ProductListMore = () => {
    const classes = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();

    // Query string validation, isInteger check if the passing arg is an integer or not 
    const pageInit = Number.isInteger(parseInt(searchParams.get('page'))) ? parseInt(searchParams.get('page')) - 1 : 0;
    const limitInit = Number.isInteger(parseInt(searchParams.get('limit'))) ? parseInt(searchParams.get('limit')) : LIMIT;
    const catInit = Number.isInteger(parseInt(searchParams.get('cat'))) ? parseInt(searchParams.get('cat')) : '';

    const [page, setPage] = useState(pageInit);
    const { data, isFetching } = useGetProductsQuery({
        pageNumber: page,
        pageSize: limitInit,
        cat: catInit,
    });

    const onPageChange = (e, value) => {
        console.log(value);
        setPage(value - 1);

        let query = { page: value, limit: limitInit };

        if(searchParams.get('cat')) {
            query = { ...query, cat: catInit };
        }

        setSearchParams(query);
    }

    return (
        <div className={classes.container}>
            {isFetching ? (
                <Box display="flex" justifyContent="center">
                    <CircularProgress color="black" size="4rem" />
                </Box>
            ) : (
                <Products data={data} />
            )}
            <Stack spacing={2} className={classes.pagination}>
                <Pagination
                    count={10}
                    shape="rounded"
                    page={page + 1}
                    size="large"
                    onChange={onPageChange}
                />
            </Stack>
        </div>
    );
};

export default ProductListMore;
