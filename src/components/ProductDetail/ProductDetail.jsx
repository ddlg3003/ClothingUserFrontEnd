import React, { useState, useRef, useEffect } from 'react';
import { 
    Typography, 
    Button, 
    Grid, 
    Box, 
    CircularProgress,
    Rating, 
    TextField, 
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Modal,
    Backdrop,
    Fade,
    selectClasses,
    Snackbar,
} from '@mui/material';
import Alert from '../Alert/Alert';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { updateCart } from '../../features/cart';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductQuery, useGetTypesQuery, useGetTypesPropsQuery } from '../../services/clothing';
import { addItemToCart } from '../../utils/api';
import useStyles from './styles';

const ProductDetail = () => {
    const classes = useStyles();
    const { name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = parseInt(name.slice(name.indexOf('.') + 1));
    const { data, isFetching } = useGetProductQuery(id);
    const { data: typesData, isFetching: isFetchingTypes } = useGetTypesQuery(id);
    const { data: typePropsData, isFetching: isFetchingTypeProps } = useGetTypesPropsQuery(id);

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [toastData, setToastData] = useState({ message: '', severity: '' });
    const [image, setImage] = useState(''); // set image for modal
    const [isSelectedImg, setIsSelectedImg] = useState(0);
    const cartData = useSelector(state => state.cart.data);
    const { isAuthenticated } = useSelector(state => state.auth);

    // Set image state for product image
    const [mainImg, setMainImg] = useState('');
    const [currentColor, setCurrentColor] = useState('');
    const [currentSize, setCurrentSize] = useState(null);
    const [openToast, setOpenToast] = useState(false);

    // Run the callback for changing the initial main image when isFetching changes
    useEffect(() => {
        setMainImg(data?.image);
    }, [isFetching]);

    // Find type quantity for current color and size
    const [type, setType] = useState(undefined);

    useEffect(() => {
        if(currentSize && currentColor) {
            const type = typesData?.find(type => type.size === currentSize && type.color === currentColor);
            setType(type);

            if(quantity > type.quantity) { 
                setQuantity(type.quantity);
            }
        }
    }, [currentColor, currentSize, isFetchingTypes]);

    const reduceQuantity = () => {
        if(quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    }

    const increaseQuantity = () => {
        if(quantity < type.quantity) {
            setQuantity(prev => prev + 1);
        }
    }

    const handleImage = (value) => {
        setImage(value);
        setOpen(true);
    }

    const handleMainImg = (value, index) => {
        setMainImg(value);
        setIsSelectedImg(index);
    }

    const handleSubmit = async () => {
        const submitData = {
            size: currentSize,
            color: currentColor,
            quantity,
            product_id: id,
            price: data?.price,

        };        
        if(isAuthenticated) {
            if(submitData.size && submitData.color && submitData.quantity) {
                const data = await addItemToCart(submitData);
                dispatch(updateCart(data));
                setToastData(prev => ({ ...prev, message: 'THÊM VÀO GIỎ HÀNG THÀNH CÔNG', severity: 'success' }));
            }
            else {
                setToastData(prev => ({ ...prev, message: 'VUI LÒNG CHỌN ĐỦ THÔNG TIN SẢN PHẨM', severity: 'info' }));
            }
            setOpenToast(true);
        }
        else navigate("/auth");
    }

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenToast(false);
      };

    if(isFetching && isFetchingTypes && isFetchingTypeProps) {
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
                            onClick={(e) => handleMainImg(data?.image, 0)}
                            style={{ 
                                opacity: isSelectedImg === 0 && '1', 
                                borderColor: isSelectedImg === 0 && 'black',
                            }}
                        />
                    </div>
                </Grid>
                <Grid item>
                    <Typography
                        fontWeight="normal" 
                        variant="title1" 
                        fontSize={28}
                    >
                       {data?.name}
                    </Typography>
                    <div>
                        <Rating readOnly value={data?.avgRating ? data?.avgRating : 0} precision={0.1} size="medium" /> 
                    </div>
                    <div>
                        <Typography 
                            color="error" 
                            fontWeight="bold"
                            fontSize={18}
                        >
                            {
                                Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                                }).format(data?.price)
                            }
                        </Typography>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Typography
                            fontWeight="normal" 
                            variant="title1" 
                            fontSize={20}
                        >
                            Màu sắc:
                        </Typography>
                        <div className={classes.wrapper}>
                            {typePropsData?.colorList.map((color, i) => (
                                <div key={color} 
                                    className={classes.colorItem} 
                                    style={{ background: `#${color}`, border: `#${color}` === `#${currentColor}` && '2px solid blue' }} 
                                    onClick={() => setCurrentColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Typography
                            fontWeight="normal" 
                            variant="title1" 
                            fontSize={20}
                        >
                            Kích cỡ: 
                        </Typography>
                        <div className={classes.wrapper}>
                            {typePropsData?.sizeList.map((size, i) => (
                                <div 
                                    className={classes.sizeItem} 
                                    style={{ border: size === currentSize && '2px solid blue' }}
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
                            Số lượng {type ? `(Còn ${type.quantity} sản phẩm)` : ''}:
                        </Typography>
                        <div className={classes.wrapper}>
                            <Button color="black" onClick={reduceQuantity}><RemoveIcon /></Button>
                            <TextField 
                                value={quantity} 
                                className={classes.input} 
                                color="black"
                            />
                            <Button color="black" onClick={increaseQuantity}><AddIcon /></Button>
                        </div>
                    </div>
                    <div style={{ marginTop: '40px' }}>
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
                            style={{ color: 'white', padding: '20px', marginLeft: '8px' }} 
                            size="large"
                        >
                            <FavoriteBorderIcon /> &nbsp; Yêu thích
                        </Button>
                        <Alert 
                            message={toastData.message}
                            openToast={openToast} 
                            handleCloseToast={handleCloseToast} 
                            color="black"
                            severity={toastData.severity}
                        />
                    </div>
                </Grid>
            </Grid>
            <Grid item container marginTop="40px" justifyContent="center" textAlign="center" direction="column"> 
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
                        fontSize="25px" 
                        fontWeight="normal" 
                        paddingBottom="30px" 
                        paddingTop="40px"
                    >
                        { data?.description }
                    </Typography> 
                </Grid>
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
                        paddingTop="40px"
                        display="block"
                    >
                        ĐÁNH GIÁ
                    </Typography> 
                </Grid>
                <Grid item>
                    <List className={classes.commentList}>
                        <Divider className={classes.divider} />
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Dante" src="https://yt3.ggpht.com/yti/AJo0G0mXhiLDl1CtA0Q65KQgegDt_mRqPuePpPzUk6ao=s88-c-k-c0x00ffffff-no-rj-mo" />
                            </ListItemAvatar>
                            <ListItemText primary="Dang" secondary={
                                    <React.Fragment>
                                        {'28-10-2022'}
                                        <Typography 
                                            letterSpacing="1px" 
                                            fontSize="16px" 
                                            fontWeight="normal" 
                                            paddingTop="10px" 
                                            component="span"
                                            color="text.primary"
                                            display="block"
                                        >
                                            Chất lượng tốt
                                        </Typography>
                                    </React.Fragment>
                                } 
                            />
                            <div style={{ marginTop: '6px' }}>
                                <Rating readOnly value={4.5} precision={0.1} size="small" /> 
                            </div>
                        </ListItem>
                        <Divider className={classes.divider} />
                    </List>       
                </Grid>
            </Grid>
            <Modal
                closeAfterTransition
                className={classes.modal}
                BackdropProps={{
                    timeout: 500
                }}
                open={open}
                onClose={() => setOpen(false)}
            >   
                <Fade in={open} timeout={500} style={{ outline: 'none' }}>
                    <img
                        src={image}
                        className={classes.image} 
                    />
                </Fade>
            </Modal>
        </Grid>
    )
}

export default ProductDetail;