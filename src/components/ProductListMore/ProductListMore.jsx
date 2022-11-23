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
    const pageNum = parseInt(searchParams.get(PRODUCT_QUERY_STRING[0])); // Get the query of page for validation
    const pageInit = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;

    const limitNum = parseInt(searchParams.get(PRODUCT_QUERY_STRING[1])); // Get the query of limit for validation
    const limitInit = Number.isInteger(limitNum) && limitNum > 0 ? limitNum : LIMIT;

    const catNum = parseInt(searchParams.get(PRODUCT_QUERY_STRING[2])); // Get the query of cat for validation
    const catInit = Number.isInteger(catNum) ? catNum : '';

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
