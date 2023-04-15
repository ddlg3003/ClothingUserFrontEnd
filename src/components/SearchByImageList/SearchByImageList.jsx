import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Box, Stack } from '@mui/material';
import { useSearchProductByImageMutation } from '../../services/productApis';
import Products from '../Products/Products';
import useStyles from './styles';
import { useSelector } from 'react-redux';

const PorductList = () => {
  const classes = useStyles();
  const { content, file } = useSelector((state) => state.image);

  const [searchProductByImage, { isLoading }] =
    useSearchProductByImageMutation();

  const [listSearch, setListSearch] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const formData = new FormData();
      formData.append('files[]', file);
      const {
        data: { list },
      } = await searchProductByImage(formData);
      setListSearch(list);
    }
    fetchData();
  }, [file]);

  return (
    <div className={classes.container}>
      <Stack direction="column" alignItems="center" mb={5}>
        <Typography
          letterSpacing="2px"
          fontSize="28px"
          fontWeight="normal"
          paddingBottom="30px"
          paddingTop="40px"
        >
          KẾT QUẢ TÌM ĐƯỢC CHO
        </Typography>
        <img src={content} className={classes.image} />
      </Stack>
      {isLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="black" size="4rem" />
        </Box>
      ) : (
        <Products data={listSearch} />
      )}
    </div>
  );
};

export default PorductList;
