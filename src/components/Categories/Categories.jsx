import React from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import Category from '../Category/Category';
import { useGetCategoriesQuery } from '../../services/catApis';
import useStyles from './styles';

const Categories = () => {
  const classes = useStyles();
  const { data, isFetching } = useGetCategoriesQuery();

  return (
    <div className={classes.cateContainer}>
      <Typography
        letterSpacing="2px"
        fontSize="28px"
        fontWeight="normal"
        align="center"
        paddingBottom="30px"
        paddingTop="40px"
      >
        DANH MỤC
      </Typography>
      <Grid container justifyContent="center" spacing={4}>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress color="black" size="4rem" />
          </Box>
        ) : (
          data.map((category) => (
            <Category key={category.id} category={category} />
          ))
        )}
      </Grid>
    </div>
  );
};

export default Categories;
