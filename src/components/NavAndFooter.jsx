import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import useStyles from './styles';

const NavAndFooter = ({ cartData, setCartData }) => {
  const classes = useStyles();

  return (
    <>
      <Navbar cartData={cartData} setCartData={setCartData} />
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default NavAndFooter;
