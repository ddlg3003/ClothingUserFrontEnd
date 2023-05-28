import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavAndFooter from './NavAndFooter';
import NotNavAndFooter from './NotNavAndFooter';
import Home from './Home/Home';
import ProductDetail from './ProductDetail/ProductDetail';
import ProductListMore from './ProductListMore/ProductListMore';
import Profile from './Profile/Profile';
import Cart from './Cart/Cart';
import Auth from './Auth/Auth';
import Checkout from './Checkout/Checkout';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { useSelector } from 'react-redux';
import SearchByImageList from './SearchByImageList/SearchByImageList';
import useStyles from './styles';
import QuestionAnswer from './QuestionAnswer/QuestionAnswer';

const App = () => {
  const classes = useStyles();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const { isCheckout } = useSelector((state) => state.checkout);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Routes>
        <Route element={<NavAndFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:name" element={<ProductDetail />} />
          <Route path="/products/" element={<ProductListMore />} />
          <Route
            path="/products/search-by-image"
            element={<SearchByImageList />}
          />
          <Route
            path="/cart"
            element={
              isAuthenticated ? <Cart /> : <Navigate replace to="/auth" />
            }
          />
          <Route
            path="/checkout"
            element={
              isAuthenticated ? (
                !isCheckout ? (
                  <Navigate replace to="/cart" />
                ) : (
                  <Checkout />
                )
              ) : (
                <Navigate replace to="/auth" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <Profile /> : <Navigate replace to="/auth" />
            }
          />
          <Route
            path="/faq"
            element={
              isAuthenticated ? (
                <QuestionAnswer />
              ) : (
                <Navigate replace to="/auth" />
              )
            }
          />
        </Route>
        <Route element={<NotNavAndFooter />}>
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth /> : <Navigate replace to="/" />}
          />
          <Route
            path="/recovery"
            element={
              !isAuthenticated ? (
                <ForgotPassword />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
