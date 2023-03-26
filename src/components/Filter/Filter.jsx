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
import { PRODUCT_QUERY_STRING } from '../../utils/globalVariables';
import useStyles from './styles';

const Filter = ({ query, setSearchParams, ratingInit }) => {
  const classes = useStyles();
  const [price, setPrice] = useState('');

  const handleRatingChange = (e) => {
    query[PRODUCT_QUERY_STRING.rating] = e.target.value;
    query[PRODUCT_QUERY_STRING.page] = 1;
    setSearchParams(query);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
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
          label="Rating"
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
        <InputLabel id="price-label">Giá</InputLabel>
        <Select
          labelId="price-label"
          id="price"
          value={price}
          label="price"
          onChange={handlePriceChange}
          className={classes.select}
        >
          <MenuItem value={3}>Thấp tới cao</MenuItem>
          <MenuItem value={4}>Cao tới thấp</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Filter;
