import React, { useRef } from 'react';
import useStyles from './styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typography, Button, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = () => {
  const classes = useStyles();
  const slider = useRef(null);
  const settings = {
    arrows: false,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <div className={classes.container}>
      <div className={classes.button}>
        <IconButton
          color="white"
          className={classes.icon}
          onClick={() => slider?.current.slickPrev()}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          color="white"
          className={classes.icon}
          onClick={() => slider?.current.slickNext()}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <Slider ref={slider} {...settings}>
        <div className={classes.slider} />
        <div className={classes.slider} />
      </Slider>
    </div>
  );
};

export default Carousel;
