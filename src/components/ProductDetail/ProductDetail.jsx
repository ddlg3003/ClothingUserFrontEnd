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
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  useGetProductQuery,
  useGetTypesQuery,
  useGetTypesPropsQuery,
  useGetProductsImagesQuery,
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
import {
  ACTIVE_STATUS,
  PRODUCT_QUERY_STRING,
} from '../../utils/globalVariables';
import useStyles from './styles';
import Comment from './Comment';
import { useGetCommentsByProductIdQuery } from '../../services/commentApis';

const ProductDetail = () => {
  const classes = useStyles();
  const { name } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // images list api
  const { data: imgArr, isFetching: isFetchingImgArr } =
    useGetProductsImagesQuery(id);

  const [toggleWishlist] = useToggleWishlistMutation();

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

  // Type props state
  const [quantity, setQuantity] = useState(1);
  const [currentColor, setCurrentColor] = useState('');
  const [sizesByColorArr, setSizesByColorArr] = useState([]);
  const [currentSize, setCurrentSize] = useState(null);

  // Set image state for product image
  const [mainImg, setMainImg] = useState('');
  const [openToast, setOpenToast] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);

  const [addItemToCart] = useAddItemToCartMutation();

  // Run the callback for changing the initial main image when isFetching changes
  useEffect(() => {
    setMainImg(imgArr ? imgArr[0]?.image : '');
    setCurrentPrice(data?.price);
    setCurrentColor(typePropsData?.colorList[0]);
  }, [isFetching, data, isFetchingImgArr, imgArr]);

  // Set size array based on color being choosed
  useEffect(() => {
    setSizesByColorArr(
      typesData
        ?.filter(({ color }) => color === currentColor)
        .map(({ size, quantity }) => ({ size, quantity }))
    );
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

      if (type) {
        setType(type);
        setCurrentPrice(type.price);

        if (quantity > type.quantity) {
          setQuantity(type.quantity);
        }
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

  let submitData = {
    size: currentSize,
    color: currentColor,
    quantity,
    product_id: id,
    price: currentPrice,
  };

  const handleSubmit = async () => {
    if (isAuthenticated) {
      if (submitData.size && submitData.color && submitData.quantity) {
        const response = await addItemToCart(submitData);

        if (response?.error && response?.error?.originalStatus === 409) {
          setToastData((prev) => ({
            ...prev,
            message: 'TH??NG TIN S???N PH???M ???? ???????C C???P NH???T',
            severity: 'error',
            color: 'error',
          }));

          setOpenToast(true);

          return window.location.reload();
        }

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
            message: `TRONG GI??? H??NG HI???N ???? C?? ${product?.quantity} S???N PH???M. KH??NG TH??? TH??M V?? S??? V?????T S??? L?????NG MUA H??NG`,
            severity: 'error',
            color: 'error',
          }));
        } else {
          setToastData((prev) => ({
            ...prev,
            message: 'TH??M S???N PH???M V??O GI??? H??NG TH??NH C??NG',
            severity: 'success',
            color: 'black',
          }));
        }
      } else {
        setToastData((prev) => ({
          ...prev,
          message: 'VUI L??NG CH???N ????? TH??NG TIN S???N PH???M',
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
    submitData = {
      ...submitData,
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
          message: 'VUI L??NG CH???N ????? TH??NG TIN S???N PH???M',
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

  const handleSetCurrentSize = (size, quantity) => {
    if (quantity) {
      setCurrentSize(size);
    }
  };

  const handleSetCurrentColor = (color) => {
    setCurrentColor(color);
    setCurrentSize(null);
    setType(undefined);
    setCurrentPrice(data?.price);
  };

  if (
    isFetching ||
    isFetchingTypes ||
    isFetchingTypeProps ||
    isFetchingImgArr
  ) {
    return (
      <Box display="flex" justifyContent="center" mt={2}>
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
            alt={''}
          />
          <div className={classes.subImageContainer}>
            {imgArr?.map(({ image }, i) => (
              <img
                key={i}
                className={classes.subImage}
                src={image}
                onClick={(e) => handleMainImg(image, i)}
                style={{
                  opacity: isSelectedImg === i && '1',
                  borderColor: isSelectedImg === i && 'black',
                }}
                alt={''}
              />
            ))}
            {/* <img
              className={classes.subImage}
              src={imgArr[0]?.image}
              alt={'product'}
              onClick={(e) => handleMainImg(imgArr[0]?.image, 0)}
              style={{
                opacity: isSelectedImg === 0 && '1',
                borderColor: isSelectedImg === 0 && 'black',
              }}
            /> */}
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
          {data?.status === ACTIVE_STATUS ? (
            <>
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
                  M??u s???c:
                </Typography>
                <div className={classes.wrapper}>
                  {typePropsData?.colorList.map((color, i) => (
                    <div
                      key={color}
                      className={classes.colorItem}
                      style={{
                        background: `#${color}`,
                        border:
                          `#${color}` === `#${currentColor}` &&
                          '2px solid blue',
                      }}
                      onClick={() => handleSetCurrentColor(color)}
                    />
                  ))}
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <Typography fontWeight="normal" variant="title1" fontSize={20}>
                  K??ch c???:
                </Typography>
                <div className={classes.wrapper}>
                  {sizesByColorArr?.map(({ size, quantity }, i) => (
                    <div
                      className={
                        quantity ? classes.sizeItem : classes.disableSizeItem
                      }
                      style={{
                        border:
                          type &&
                          size === currentSize &&
                          quantity &&
                          '2px solid blue',
                      }}
                      key={i}
                      onClick={() => handleSetCurrentSize(size, quantity)}
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
                  S??? l?????ng: {type ? `(C??n ${type.quantity} s???n ph???m)` : ''}
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
                    Th??m v??o gi???
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
                  <Tooltip title={!fav ? 'Th??ch' : 'B??? th??ch'}>
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
            </>
          ) : (
            <>
              <div>
                <Typography color="error" fontSize={22} mb={2}>
                  S???N PH???M T???M NG???NG KINH DOANH
                </Typography>
              </div>
              <Tooltip title={!fav ? 'Th??ch' : 'B??? th??ch'}>
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
              <div style={{ marginTop: '8px' }}>
                <Typography
                  color="#000"
                  fontSize={18}
                  component={Link}
                  to={`/products?${PRODUCT_QUERY_STRING[0]}=1`}
                >
                  Xem c??c s???n ph???m kh??c
                </Typography>
              </div>
            </>
          )}
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
            CHI TI???T S???N PH???M
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
            ????NH GI??
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            height: '460px',
            overflow: commentsData?.length > 3 ? 'scroll' : 'none',
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
                Ch??a c?? ????nh gi?? n??o
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
