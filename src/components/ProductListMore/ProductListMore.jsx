import React from 'react';
import Products from '../Products/Products';
import {
  Box,
  CircularProgress,
  Pagination,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useGetProductsQuery } from '../../services/productApis';
import { useSearchParams } from 'react-router-dom';
import { LIMIT, PRODUCT_QUERY_STRING } from '../../utils/globalVariables';
import Filter from '../Filter/Filter';
import useStyles from './styles';

const ProductListMore = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 800px)');

  // Hook for set query string state
  const [searchParams, setSearchParams] = useSearchParams();

  // Query string validation, isInteger check if the passing arg is an integer or not
  // 3 main query: page, limit, cat
  const pageNum = parseInt(searchParams.get(PRODUCT_QUERY_STRING.page)); // Get the query of page for validation
  const pageInit = Number.isInteger(pageNum) && pageNum > 0 ? pageNum : 1;
  const searchInit = searchParams.get(PRODUCT_QUERY_STRING.keyword);
  const catNum = parseInt(searchParams.get(PRODUCT_QUERY_STRING.cat)); // Get the query of cat for validation
  const catInit = Number.isInteger(catNum) ? catNum : '';
  const sortByInit = searchParams.get(PRODUCT_QUERY_STRING.sortBy);

  const ratingNum =
    parseInt(searchParams.get(PRODUCT_QUERY_STRING.rating)) || '';

  const ratingInit =
    Number.isInteger(ratingNum) && ratingNum >= 3 && ratingNum <= 5
      ? ratingNum
      : '';

  const query = {
    [PRODUCT_QUERY_STRING.page]: pageInit,
  };

  // Check if cat query exist
  if (catInit) {
    query[PRODUCT_QUERY_STRING.cat] = catInit;
  }

  // Check if search query exist
  if (searchInit) {
    query[PRODUCT_QUERY_STRING.keyword] = searchInit;
  }

  // Check if rating query exist
  if (ratingInit) {
    query[PRODUCT_QUERY_STRING.rating] = ratingInit;
  }

  // Check if sort_by query exist
  if (sortByInit) {
    query[PRODUCT_QUERY_STRING.sortBy] = sortByInit;
  }

  const { data, isFetching } = useGetProductsQuery(query);

  const onPageChange = (_, value) => {
    query[PRODUCT_QUERY_STRING.page] = value;
    setSearchParams(query);
  };

  return (
    <>
      <Filter
        query={query}
        setSearchParams={setSearchParams}
        ratingInit={ratingInit}
        sortByInit={sortByInit}
      />
      <div className={classes.container}>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="black" size="4rem" />
          </Box>
        ) : (
          <>
            <Products data={data?.list} />
            <Stack spacing={2} className={classes.pagination}>
              <Pagination
                count={Math.ceil(data?.numberItem / LIMIT)}
                shape="rounded"
                page={pageInit}
                size={isMobile ? 'small' : 'large'}
                siblingCount={isMobile ? -1 : 2}
                onChange={onPageChange}
              />
            </Stack>
          </>
        )}
      </div>
    </>
  );
};

export default ProductListMore;
