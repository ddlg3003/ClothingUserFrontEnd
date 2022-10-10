import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import Home from './Home/Home';
import ProductDetail from './ProductDetail/ProductDetail';
import Profile from './Profile/Profile'
import Cart from './Cart/Cart';
import Login from './Login/Login';

const App = () => {
    return (
        <div>
            <CssBaseline />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="user/:id" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default App;