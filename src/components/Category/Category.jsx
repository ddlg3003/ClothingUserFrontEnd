import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import {
  PRODUCT_QUERY_STRING,
  CATEGORY_IMG,
} from '../../utils/globalVariables';

const Category = ({ category }) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Link
        to={`/products?${PRODUCT_QUERY_STRING.cat}=${category.id}&${
          PRODUCT_QUERY_STRING.page
        }=${1}`}
        className={classes.links}
      >
        <Typography
          fontWeight="500"
          position="absolute"
          className={classes.cateName}
          align="center"
          fontSize="20px"
        >
          {category.name}
        </Typography>
        <img src={CATEGORY_IMG} className={classes.image} />
      </Link>
    </Grid>
  );
};

export default Category;
