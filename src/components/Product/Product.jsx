import React from 'react';
import { Typography, Grid, Rating } from '@mui/material'; 
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const classes = useStyles();

    return (
        <>
            <Grid item>
                <Link to={`/products/${product.id}`} className={classes.links}>
                    <img 
                        src={product.image}
                        className={classes.image}
                    />
                    <div>
                        <Rating readOnly value={product.avgRating ? product.avgRating : 0} precision={0.1} size="large" /> 
                    </div>
                    <Typography 
                        fontWeight="normal" 
                        variant="title1" 
                        className={classes.title} 
                        fontSize={16}
                    >
                        {product.name}
                    </Typography>
                    <Typography 
                        color="error" 
                        className={classes.title} 
                        fontWeight="bold"
                        fontSize={18}
                    >
                        {
                            Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                            }).format(100000)
                        }
                    </Typography>
                </Link>
            </Grid>
        </>
    )
}

export default Product;