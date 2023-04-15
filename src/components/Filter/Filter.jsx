import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  PRODUCT_QUERY_STRING,
  SORT_CRITERIA,
} from '../../utils/globalVariables';
import useStyles from './styles';

const Filter = ({ query, setSearchParams, ratingInit, sortByInit }) => {
  const classes = useStyles();

  const handleRatingChange = (e) => {
    query[PRODUCT_QUERY_STRING.rating] = e.target.value;
    query[PRODUCT_QUERY_STRING.page] = 1;
    setSearchParams(query);
  };

  const sortToVal = (sort) => {
    let val = 0;

    if (sort === SORT_CRITERIA.priceAsc) val = 1;
    else if (sort === SORT_CRITERIA.priceDesc) val = 2;
    else if (sort === SORT_CRITERIA.soldDesc) val = 3;
    else val = '';

    return val;
  };

  const handleCriteriaChange = (e) => {
    if (e.target.value === 1) {
      query[PRODUCT_QUERY_STRING.sortBy] = SORT_CRITERIA.priceAsc;
    } else if (e.target.value === 2) {
      query[PRODUCT_QUERY_STRING.sortBy] = SORT_CRITERIA.priceDesc;
    } else {
      query[PRODUCT_QUERY_STRING.sortBy] = SORT_CRITERIA.soldDesc;
    }

    query[PRODUCT_QUERY_STRING.page] = 1;
    setSearchParams(query);
  };

  return (
    <Stack
      direction="row"
      display="flex"
      alignItems="center"
      height="60px"
      marginTop="20px"
      spacing={3}
    >
      <Typography
        letterSpacing="2px"
        fontSize="24px"
        fontWeight="normal"
        align="center"
        marginLeft="24px"
      >
        <FilterListIcon /> Lọc sản phẩm
      </Typography>
      <FormControl className={classes.controlWidth} size="small">
        <InputLabel id="rating-label">Đánh giá</InputLabel>
        <Select
          labelId="rating-label"
          id="rating"
          value={ratingInit}
          label="Rating---"
          onChange={handleRatingChange}
          className={classes.select}
        >
          <MenuItem value={3}>
            <Rating size="small" name="read-only" value={3} readOnly />
          </MenuItem>
          <MenuItem value={4}>
            <Rating size="small" name="read-only" value={4} readOnly />
          </MenuItem>
          <MenuItem value={5}>
            <Rating size="small" name="read-only" value={5} readOnly />
          </MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.controlWidth} size="small">
        <InputLabel id="criteria-label">Tiêu chí</InputLabel>
        <Select
          labelId="criteria-label"
          id="criteria"
          value={sortToVal(sortByInit)}
          label="criteria"
          onChange={handleCriteriaChange}
          className={classes.select}
        >
          <MenuItem value={1}>Giá thấp tới cao</MenuItem>
          <MenuItem value={2}>Giá cao tới thấp</MenuItem>
          <MenuItem value={3}>Mua nhiều</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filter;
