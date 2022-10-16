import React from 'react';
import { Typography, Grid, Button } from '@mui/material'; 
import useStyles from './styles';
import Products from '../Products/Products'

const PorductList = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h3" align="center" paddingBottom="30px" paddingTop="40px">SẢN PHẨM HOT</Typography>
            <Products />
            <div className={classes.moreButton}>
                <Button variant="contained" color="secondary" style={{ margin: '20px 0 40px 0' }} size="large">Xem thêm</Button> 
            </div>
        </div>
    )
}

export default PorductList;