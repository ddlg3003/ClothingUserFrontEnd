import React, { useState, useRef } from 'react';
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
} from '@mui/material';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from './styles';

const ProductDetail = () => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState(0);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(""); // set image for modal
    const [isSelectedImg, setIsSelectedImg] = useState(null);

    const images = [
        'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC05295-copy_73.jpg',
        'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/trangstrike.jpg',
        'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC05301-copy_92.jpg',
        'https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC05295-copy_73.jpg'

    ];

    // Set image state for product image
    const [mainImg, setMainImg] = useState(images[0]);

    const colors = [
        '#f1f1f1',
        '#000',
        '#5b7fd4'
    ];

    const sizes = [
        'S', 'M', 'L',
    ];

    const reduceQuantity = () => {
        if(quantity > 0) {
            setQuantity(prev => prev - 1);
        }
    }

    const increaseQuantity = () => {
        setQuantity(prev => prev + 1);
    }

    const handleImage = (value) => {
        setImage(value);
        setOpen(true);
    }

    const handleMainImg = (value, index) => {
        setMainImg(value);
        setIsSelectedImg(index);
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
                        {images.map((image, i) => (
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
                        ))}
                    </div>
                </Grid>
                <Grid item>
                    <Typography
                        fontWeight="normal" 
                        variant="title1" 
                        fontSize={28}
                    >
                        Áo Polo nam Pique Cotton USA thấm hút tối đa (kẻ sọc)
                    </Typography>
                    <div>
                        <Rating readOnly value={4.5} precision={0.1} size="medium" /> 
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
                                }).format(100000)
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
                            {colors.map((color, i) => (
                                <div key={color} className={classes.colorItem} style={{ background: color }} />
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
                            {sizes.map((size, i) => (
                                <div className={classes.sizeItem} key={size}>{size}</div>
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
                            Số lượng:
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
                        Lorem ipsum dolor sit amet
                    </Typography> 
                </Grid>
            </Grid>
            <Grid item container marginTop="40px" justifyContent="center" textAlign="center" direction="column">
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
                    <List>
                        <ListItem>KAAK</ListItem>
                        <Divider />
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