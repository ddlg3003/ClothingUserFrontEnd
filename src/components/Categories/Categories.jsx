import React from 'react';
import{ Grid, Typography } from '@mui/material';
import Category from '../Category/Category';
import useStyles from './styles';

const Categories = () => {
    const classes = useStyles();

    return (
        <div className={classes.cateContainer}>
            <Typography variant="h3" align="center" paddingBottom="20px" paddingTop="40px">Danh mục</Typography>
            <Grid container justifyContent="center" spacing={2}>                 
                <Category />
                <Category />
                <Category />
                <Category />
            </Grid>
        </div>
    )
}

export default Categories;