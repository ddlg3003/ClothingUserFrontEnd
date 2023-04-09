import React from 'react';
import { Typography, Button, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/productApis';
import Products from '../Products/Products';
import { PRODUCT_QUERY_STRING } from '../../utils/globalVariables';
import RecommendList from '../RecommendList/RecommendList';
import useStyles from './styles';

const PorductList = () => {
  const classes = useStyles();
  const { data, isFetching } = useGetProductsQuery({
    page: 1,
    pageSize: 8,
  });

  return (
    <div className={classes.container}>
      <RecommendList />
      <Typography
        letterSpacing="2px"
        fontSize="28px"
        fontWeight="normal"
        align="center"
        paddingBottom="30px"
        paddingTop="40px"
      >
        SẢN PHẨM HOT
      </Typography>
      {isFetching ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="black" size="4rem" />
        </Box>
      ) : (
        <Products data={data?.list} />
      )}
      <div className={classes.moreButton}>
        <Button
          component={Link}
          to={`/products?${PRODUCT_QUERY_STRING.page}=${1}`}
          variant="contained"
          color="black"
          style={{ margin: '20px 0 40px 0', color: 'white' }}
          size="large"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
};

export default PorductList;
