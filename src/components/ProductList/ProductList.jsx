import React from 'react';
import { Typography, Grid, Button, CircularProgress, Box } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../services/clothing';
import useStyles from './styles';
import Products from '../Products/Products'

const PorductList = () => {
    const classes = useStyles();
    const { data, isFetching } = useGetProductsQuery();


    return (
        <div className={classes.container}>
            <Typography letterSpacing="2px" fontSize="25px" fontWeight="normal" align="center" paddingBottom="30px" paddingTop="40px">SẢN PHẨM HOT</Typography>
            {
                isFetching ? (
                    <Box display="flex" justifyContent="center">
                        <CircularProgress color="black" size="4rem" />
                    </Box>
                ) : (
                    <Products data={data} />
                )
            }
            <div className={classes.moreButton}>
                <Button component={Link} to="/products" variant="contained" color="black" style={{ margin: '20px 0 40px 0', color: 'white' }} size="large">Xem thêm</Button> 
            </div>
        </div>
    )
}

export default PorductList;