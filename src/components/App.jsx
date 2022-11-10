import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import NavAndFooter from './NavAndFooter';
import NotNavAndFooter from './NotNavAndFooter';
import Home from './Home/Home';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductListMore from './ProductListMore/ProductListMore';
import Profile from './Profile/Profile'
import Cart from './Cart/Cart';
import Auth from './Auth/Auth';
import Checkout from './Checkout/Checkout';
import useStyles from './styles';

const App = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <main className={classes.content}>
                <Routes>
                    <Route element={<NavAndFooter />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/products/:id" element={<ProductDetail />} />
                        <Route path="/products/" element={<ProductListMore />} />
                        <Route path="user/:id" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route element={<NotNavAndFooter />}>
                        <Route path="/auth" element={<Auth />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}

export default App;