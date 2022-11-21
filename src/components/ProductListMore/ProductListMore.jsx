import React, { useState } from 'react';
import Products from '../Products/Products';
import { Box, CircularProgress, Pagination, Stack } from '@mui/material';
import { useGetProductsQuery } from '../../services/clothing';
import { useSearchParams } from 'react-router-dom';
import { LIMIT, PRODUCT_QUERY_STRING } from '../../utils/globalVariables';
import useStyles from './styles';

const ProductListMore = () => {
    const classes = useStyles();
    const [searchParams, setSearchParams] = useSearchParams();

    // Query string validation, isInteger check if the passing arg is an integer or not 
    // 3 main query: page, limit, cat
    const pageInit = Number.isInteger(parseInt(searchParams.get(PRODUCT_QUERY_STRING[0]))) ? 
        parseInt(searchParams.get(PRODUCT_QUERY_STRING[0])) : 0;

    const limitInit = Number.isInteger(parseInt(searchParams.get(PRODUCT_QUERY_STRING[1]))) ? 
        parseInt(searchParams.get(PRODUCT_QUERY_STRING[1])) : LIMIT;

    const catInit = Number.isInteger(parseInt(searchParams.get(PRODUCT_QUERY_STRING[2]))) ? 
        parseInt(searchParams.get(PRODUCT_QUERY_STRING[2])) : '';

    const [page, setPage] = useState(pageInit);
    const { data, isFetching } = useGetProductsQuery({
        pageNumber: page,
        pageSize: limitInit,
        cat: catInit,
    });

    const onPageChange = (e, value) => {
        console.log(value);
        setPage(value);

        let query = { [PRODUCT_QUERY_STRING[0]]: value, [PRODUCT_QUERY_STRING[1]]: limitInit };

        if(searchParams.get('cat')) {
            query = { ...query, [PRODUCT_QUERY_STRING[2]]: catInit };
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
                <>
                    <Products data={data} />
                    <Stack spacing={2} className={classes.pagination}>
                    <Pagination
                        count={Math.ceil(data?.numberItem / limitInit)}
                        shape="rounded"
                        page={page}
                        size="large"
                        onChange={onPageChange}
                    />
                    </Stack>
                </>
            )}
        </div>
    );
};

export default ProductListMore;
