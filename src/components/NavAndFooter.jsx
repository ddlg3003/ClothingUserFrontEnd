import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import useStyles from './styles';

const NavAndFooter = () => {
    const classes = useStyles();

    return (
        <>
            <Navbar />
            <div className={classes.toolbar}/>
            <Outlet />
            <Footer />
        </>
    )
}

export default NavAndFooter;