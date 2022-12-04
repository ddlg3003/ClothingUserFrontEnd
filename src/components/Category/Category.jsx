import React from 'react';
import { Grid, Typography } from '@mui/material';
import useStyles from './styles';
import { Link } from 'react-router-dom';
import { LIMIT, PRODUCT_QUERY_STRING, CATEGORY_IMG } from '../../utils/globalVariables';

const Category = ({ category }) => {
    const classes = useStyles();
 
    return (
        <Grid item>
            <Link 
                to={`/products?${PRODUCT_QUERY_STRING[0]}=${1}&${PRODUCT_QUERY_STRING[1]}=${LIMIT}&${PRODUCT_QUERY_STRING[2]}=${category.id}`} 
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
            <img 
                src={CATEGORY_IMG}
                className={classes.image}
            />
            </Link>
        </Grid>  
  )
}

export default Category;