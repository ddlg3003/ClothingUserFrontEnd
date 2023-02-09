import { Divider, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetRecommendedProductsQuery } from '../../services/productApis';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Products from '../Products/Products';

const RecommendList = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data: recommendData, isFetching: isFetchingRecommendData } =
    useGetRecommendedProductsQuery(user?.id, { skip: !isAuthenticated });

  return (
    <div style={{ marginBottom: '60px' }}>
      {user && !isFetchingRecommendData && recommendData?.list.length > 0 ? (
        <>
          <Typography
            letterSpacing="2px"
            fontSize="28px"
            fontWeight="normal"
            align="center"
            paddingBottom="30px"
            paddingTop="40px"
          >
            GỢI Ý CHO BẠN <AutoAwesomeIcon fontSize="large" color="warning" />
          </Typography>
          <Products data={recommendData?.list.slice(0, 8)} />
          <Divider sx={{ mt: '40px' }} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RecommendList;
