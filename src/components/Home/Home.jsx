import React from 'react';
import Categories from '../Categories/Categories';
import ProductList from '../ProductList/ProductList';
import Carousel from '../Carousel/Carousel';

const Home = () => {
  return (
    <div>
      <Carousel />
      <Categories />
      <ProductList />
    </div>
  );
};

export default Home;
