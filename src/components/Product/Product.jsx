import React from 'react';
import { Typography, Grid, Rating } from '@mui/material'; 
import useStyles from './styles';
import { Link } from 'react-router-dom';

const Product = () => {
    const classes = useStyles();

    return (
        <>
            <Grid item>
                <Link to="/" className={classes.links}>
                    <img 
                        src={'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC05295-copy_73.jpg'}
                        className={classes.image}
                    />
                    <div>
                        <Rating readOnly value={4.5} precision={0.1} size="large" /> 
                    </div>
                    <Typography variant="title1" className={classes.title} fontSize={18}>Áo Polo nam Pique Cotton USA thấm hút tối đa (kẻ sọc)</Typography>
                    <Typography 
                        color="error" 
                        className={classes.title} 
                        fontWeight="bold" 
                        fontSize={20}
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