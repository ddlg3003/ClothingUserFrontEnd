import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Grid,
  Box,
  CircularProgress,
  Rating,
  TextField,
  Modal,
  Fade,
  useMediaQuery,
  Stack,
  Tooltip,
  Divider,
} from '@mui/material';
import Alert from '../Alert/Alert';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductQuery,
  useGetTypesQuery,
  useGetTypesPropsQuery,
} from '../../services/productApis';
import {
  useAddItemToCartMutation,
  useGetCartQuery,
} from '../../services/cartApis';
import { updateCheckout } from '../../features/checkout';
import {
  useToggleWishlistMutation,
  useGetUserWishlistQuery,
} from '../../services/wishlistApis';
import useStyles from './styles';
import Comment from '../Comment/Comment';
import { useGetCommentsByProductIdQuery } from '../../services/commentApis';

const ProductDetail = () => {
  const classes = useStyles();
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const testLength = 0;

  const id = parseInt(name.slice(name.indexOf('.') + 1));

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data, isFetching } = useGetProductQuery(id);

  // type api
  const { data: typesData, isFetching: isFetchingTypes } = useGetTypesQuery(id);

  // color array api
  const { data: typePropsData, isFetching: isFetchingTypeProps } =
    useGetTypesPropsQuery(id);

  // wishlist api
  const { data: wishlistData, isFetching: isFetchingWishlist } =
    useGetUserWishlistQuery({ skip: !isAuthenticated });

  // cart api
  const { data: dataCartList } = useGetCartQuery();

  // comment api
  const { data: commentsData, isFetching: isFetchingComments } =
    useGetCommentsByProductIdQuery(id);

  const [toggleWishlist] = useToggleWishlistMutation();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState({
    message: '',
    severity: '',
    color: '',
  });
  const [image, setImage] = useState(''); // set image for modal
  const [isSelectedImg, setIsSelectedImg] = useState(0);
  const [fav, setFav] = useState(false);

  const isMobile = useMediaQuery('(max-width: 800px)');

  // Set image state for product image
  const [mainImg, setMainImg] = useState('');
  const [currentColor, setCurrentColor] = useState('');
  const [sizesByColorArr, setSizesByColorArr] = useState([]);
  const [currentSize, setCurrentSize] = useState(null);
  const [openToast, setOpenToast] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [addItemToCart] = useAddItemToCartMutation();

  // Run the callback for changing the initial main image when isFetching changes
  useEffect(() => {
    setMainImg(data?.image);
    setCurrentPrice(data?.price);
    setCurrentColor(data?.color);
  }, [isFetching, data]);

  // Set size array based on color being choosed
  useEffect(() => {
    setSizesByColorArr(typesData
    ?.filter(({ color }) => (color === currentColor)).map(({ size }) => size));
  }, [isFetchingTypes, typesData, currentColor]);

  useEffect(() => {
    if (isAuthenticated) {
      // Set fav on or off base on product in fav list, if product is in the list, then true, if
      // not then false
      setFav(!!wishlistData?.find((wishlist) => id === wishlist?.productId));
    }
  }, [wishlistData, isFetchingWishlist, isAuthenticated]);

  // Find type quantity for current color and size
  const [type, setType] = useState(undefined);

  useEffect(() => {
    if (currentSize && currentColor) {
      const type = typesData?.find(
        (type) => type.size === currentSize && type.color === currentColor
      );

      if(type) {
        setType(type);
        setCurrentPrice(type.price);

        if (quantity > type.quantity) {
          setQuantity(type.quantity);
        }
      }
      else {
        setCurrentPrice(data?.price);
        setCurrentSize(null);
        setType(undefined);
      }
    }
  }, [currentColor, currentSize, isFetchingTypes, typesData, quantity]);

  const reduceQuantity = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < type?.quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleImage = (value) => {
    setImage(value);
    setOpen(true);
  };

  const handleMainImg = (value, index) => {
    setMainImg(value);
    setIsSelectedImg(index);
  };

  const handleSubmit = async () => {
    const submitData = {
      size: currentSize,
      color: currentColor,
      quantity,
      product_id: id,
      price: currentPrice,
    };

    if (isAuthenticated) {
      if (submitData.size && submitData.color && submitData.quantity) {
        await addItemToCart(submitData);

        // find the current product type in cart
        const product = dataCartList?.find(
          (item) =>
            item?.size === currentSize &&
            item?.product_id &&
            item?.color === currentColor
        );

        // Check if current quantity + added quantity > max quantity --> show error message
        if (product?.quantity + quantity > product?.availableQuantity) {
          setToastData((prev) => ({
            ...prev,
            message: `TRONG GIỎ HÀNG HIỆN ĐÃ CÓ ${product?.quantity} SẢN PHẨM. KHÔNG THỂ THÊM VÌ SẼ VƯỢT SỐ LƯỢNG MUA HÀNG`,
            severity: 'error',
            color: 'error',
          }));
        } else {
          setToastData((prev) => ({
            ...prev,
            message: 'THÊM SẢN PHẨM VÀO GIỎ HÀNG THÀNH CÔNG',
            severity: 'success',
            color: 'black',
          }));
        }
      } else {
        setToastData((prev) => ({
          ...prev,
          message: 'VUI LÒNG CHỌN ĐỦ THÔNG TIN SẢN PHẨM',
          severity: 'info',
          color: 'error',
        }));
      }
      setOpenToast(true);
    } else navigate('/auth');
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const handleBuyNow = () => {
    const submitData = {
      size: currentSize,
      color: currentColor,
      quantity,
      product_id: id,
      price: currentPrice,
      proImage: mainImg,
      proName: data?.name,
    };

    dispatch(updateCheckout());
    if (isAuthenticated) {
      if (submitData.size && submitData.color && submitData.quantity) {
        sessionStorage.setItem('cartItems', JSON.stringify([submitData]));
        navigate('/checkout');
      } else {
        setToastData((prev) => ({
          ...prev,
          message: 'VUI LÒNG CHỌN ĐỦ THÔNG TIN SẢN PHẨM',
          severity: 'info',
          color: 'error',
        }));
        setOpenToast(true);
      }
    } else navigate('/auth');
  };

  const handleFavorite = async () => {
    if (isAuthenticated) {
      await toggleWishlist(id);
    } else navigate('/auth');
  };

  if (isFetching && isFetchingTypes && isFetchingTypeProps) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="black" size="6rem" />
      </Box>
    );
  }

  return (
    <Grid container className={classes.container}>
      <Grid item container justifyContent="center" spacing={3}>
        <Grid item style={{ position: 'relative' }}>
          <img
            className={classes.image}
            src={mainImg}
            onClick={(e) => handleImage(mainImg)}
            alt={'product'}
          />
          <div className={classes.subImageContainer}>
            {/* {product.images.map((image, i) => (
                            <img 
                                key={i}
                                className={classes.subImage} 
                                src={image}
                                onClick={(e) => handleMainImg(image, i)}
                                style={{ 
                                    opacity: isSelectedImg === i && '1', 
                                    borderColor: isSelectedImg === i && 'black',
                                }}
                            />
                        ))} */}
            <img
              className={classes.subImage}
              src={data?.image}
              alt={'product'}
              onClick={(e) => handleMainImg(data?.image, 0)}
              style={{
                opacity: isSelectedImg === 0 && '1',
                borderColor: isSelectedImg === 0 && 'black',
              }}
            />
          </div>
        </Grid>
        <Grid item>
          <Typography fontWeight="normal" variant="title1" fontSize={28}>
            {data?.name}
          </Typography>
          <div>
            <Rating
              readOnly
              value={data?.avgRating ? data?.avgRating : 0}
              precision={0.1}
              size="medium"
            />
          </div>
          <div>
            <Typography color="error" fontWeight="bold" fontSize={18}>
              {Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(currentPrice)}
            </Typography>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography fontWeight="normal" variant="title1" fontSize={20}>
              Màu sắc:
            </Typography>
            <div className={classes.wrapper}>
              {typePropsData?.colorList.map((color, i) => (
                <div
                  key={color}
                  className={classes.colorItem}
                  style={{
                    background: `#${color}`,
                    border:
                      `#${color}` === `#${currentColor}` && '2px solid blue',
                  }}
                  onClick={() => setCurrentColor(color)}
                />
              ))}
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography fontWeight="normal" variant="title1" fontSize={20}>
              Kích cỡ:
            </Typography>
            <div className={classes.wrapper}>
              {sizesByColorArr?.map((size, i) => (
                <div
                  className={classes.sizeItem}
                  style={{
                    border: type && size === currentSize && '2px solid blue',
                  }}
                  key={size}
                  onClick={() => setCurrentSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Typography
              fontWeight="normal"
              variant="title1"
              fontSize={20}
              marginBottom={4}
            >
              Số lượng: {type ? `(Còn ${type.quantity} sản phẩm)` : ''}
            </Typography>
            <div className={classes.wrapper}>
              <Button color="black" onClick={reduceQuantity}>
                <RemoveIcon />
              </Button>
              <TextField
                value={quantity}
                className={classes.input}
                color="black"
              />
              <Button color="black" onClick={increaseQuantity}>
                <AddIcon />
              </Button>
            </div>
          </div>
          <div style={{ marginTop: '40px' }}>
            <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>
              <Button
                variant="contained"
                color="black"
                style={{ color: 'white', padding: '20px' }}
                size="large"
                onClick={handleSubmit}
              >
                Thêm vào giỏ
              </Button>
              <Button
                variant="contained"
                color="error"
                style={{ color: 'white', padding: '20px' }}
                size="large"
                onClick={handleBuyNow}
              >
                Mua ngay
              </Button>
              <Tooltip title={!fav ? 'Thích' : 'Bỏ thích'}>
                <Button
                  variant="outlined"
                  color="error"
                  style={{ padding: '20px' }}
                  size="large"
                  onClick={handleFavorite}
                >
                  {!fav ? <FavoriteBorderIcon /> : <FavoriteIcon />}
                </Button>
              </Tooltip>
            </Stack>
            <Alert
              message={toastData.message}
              openToast={openToast}
              handleCloseToast={handleCloseToast}
              color={toastData.color}
              severity={toastData.severity}
            />
          </div>
        </Grid>
      </Grid>
      <Grid
        item
        container
        marginTop="40px"
        justifyContent="center"
        textAlign="center"
        direction="column"
      >
        <Grid item>
          <Typography
            letterSpacing="2px"
            fontSize="25px"
            fontWeight="normal"
            paddingTop="40px"
          >
            CHI TIẾT SẢN PHẨM
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            letterSpacing="2px"
            fontSize="20px"
            fontWeight="normal"
            paddingBottom="30px"
            paddingTop="40px"
          >
            {data?.description}
          </Typography>
        </Grid>
        <Divider />
      </Grid>
      <Grid
        item
        container
        marginTop="40px"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Typography
            letterSpacing="2px"
            fontSize="25px"
            fontWeight="normal"
            paddingTop="36px"
            display="block"
          >
            ĐÁNH GIÁ
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            minHeight: '300px',
            overflow: commentsData?.length > 2 ? 'scroll' : 'none',
          }}
        >
          {commentsData?.length === 0 ? (
            <>
              <Typography
                letterSpacing="2px"
                fontSize="22px"
                paddingTop="36px"
                display="block"
              >
                Chưa có đánh giá nào
              </Typography>
              <SentimentDissatisfiedIcon fontSize="large" />
            </>
          ) : (
            commentsData?.map((comment) => (
              <Comment keyname={comment?.id} comment={comment} />
            ))
          )}
        </Grid>
      </Grid>
      <Modal
        closeAfterTransition
        className={classes.modal}
        BackdropProps={{
          timeout: 500,
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Fade in={open} timeout={500} style={{ outline: 'none' }}>
          <img src={image} className={classes.image} />
        </Fade>
      </Modal>
    </Grid>
  );
};

export default ProductDetail;
