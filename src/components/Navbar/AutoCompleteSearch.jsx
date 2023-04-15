import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import { useGetProductsQuery } from '../../services/productApis';
import { URL_REGEX } from '../../utils/globalVariables';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const AutoCompleteSearch = ({
  hidden,
  query,
  setQuery,
  setNotOpenAutoComplete,
}) => {
  const classes = useStyles();

  const { data: productsData, isFetching: isFetchingProducts } =
    useGetProductsQuery(
      {
        page: 1,
        keyword: query,
      },
      {
        skip: !query,
      },
    );

  // Array to store search data
  const [searchList, setSearchList] = useState([]);

  // Callback for reset array and set array
  useEffect(() => {
    setSearchList(productsData?.list);

    if (!query) {
      setSearchList([]);
    }
  }, [isFetchingProducts, productsData, query]);

  return (
    <Paper
      sx={{ position: 'absolute', width: '90%', zIndex: 99 }}
      hidden={hidden}
    >
      {isFetchingProducts ? (
        <Box display="flex" justifyContent="center" mt={3} mb={3}>
          <CircularProgress color="black" size="3rem" />
        </Box>
      ) : (
        searchList?.slice(0, 5).map((product, i) => (
          <Stack
            key={i}
            direction="row"
            spacing={2}
            p={1}
            component={Link}
            sx={{ textDecoration: 'none' }}
            className={classes.productSearchItem}
            onClick={() => {
              setNotOpenAutoComplete(true);
              setQuery('');
              setSearchList([]);
            }}
            to={`/products/${product?.name
              .replace(URL_REGEX, '-')
              .toLowerCase()}-i.${product?.id}`}
          >
            <img src={`${product?.image}`} alt={''} width={28} />
            <Stack>
              <Typography
                variant="title1"
                fontSize="14px"
                color="#000"
                fontWeight={300}
              >
                {product?.name}
              </Typography>
              <Typography variant="subtitle1" fontSize="13px" color="error">
                {Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product?.price)}
              </Typography>
            </Stack>
          </Stack>
        ))
      )}
    </Paper>
  );
};

export default AutoCompleteSearch;
