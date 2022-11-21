import React, { useState, useEffect } from 'react';
import { BLACK_LOGO, LIMIT } from '../../utils/globalVariables';
import {
    AppBar,
    Toolbar,
    Drawer,
    Button,
    IconButton,
    useMediaQuery,
    Menu,
    MenuItem,
    Avatar,
    Badge,
} from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import {
    Search as SearchIcon,
    AccountCircle,
    Menu as MenuIcon,
} from '@mui/icons-material';
import MuiAlert from '@mui/material/Alert';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecondNavbar from '../SecondNavbar/SecondNavbar';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    useGetCategoriesQuery,
    useGetCartQuery,
} from '../../services/clothing';
import { logout } from '../../features/auth';
import { increaseItem, decreaseItem, updateCart } from '../../features/cart';
import decode from 'jwt-decode';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();

    const { isAuthenticated } = useSelector((state) => state.auth);
    const user = JSON.parse(localStorage.getItem('user'));

    const { data: dataCartList, isFetching: isFetchingCartList } = useGetCartQuery({ skip: !isAuthenticated });

    useEffect(() => {
        if (!isFetchingCartList) {
            dispatch(updateCart(dataCartList));
        }
    }, [isFetchingCartList]);

    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if(token) {
          const decodedToken = decode(token);
    
          if(decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());; 
        }
      }, [location]);

    const cartData = useSelector((state) => state.cart.data);
    const { data, isFetching } = useGetCategoriesQuery();

    let currentHovering = false;
    let currentAuthHovering = false;

    const logo = BLACK_LOGO;
    const isMobile = useMediaQuery('(max-width: 800px)');

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAuth, setAnchorElAuth] = useState(null);

    // Auth hover functions
    const handleClickAuth = (e) => {
        if (anchorElAuth !== e.currentTarget) {
            setAnchorElAuth(e.currentTarget);
        }
    };

    const handleHoverAuth = (e) => {
        currentAuthHovering = true;
    };

    const handleCloseAuth = () => {
        setAnchorElAuth(null);
    };

    const handleLogout = () => {
        setAnchorElAuth(null);

        window.location.href = 'http://localhost:3000/auth';

        dispatch(logout());
    };

    const handleCloseHoverAuth = (e) => {
        currentAuthHovering = false;

        setTimeout(() => {
            if (!currentAuthHovering) {
                handleCloseAuth();
            }
        }, 50);
    };

    // Category hover functions
    const handleClick = (e) => {
        if (anchorEl !== e.currentTarget) {
            setAnchorEl(e.currentTarget);
        }
    };

    const handleHover = (e) => {
        currentHovering = true;
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseHover = (e) => {
        currentHovering = false;

        setTimeout(() => {
            if (!currentHovering) {
                handleClose();
            }
        }, 50);
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {!isMobile && (
                        <Link to="/">
                            <img src={logo} />
                        </Link>
                    )}
                    {isMobile && (
                        <IconButton
                            onClick={() =>
                                setMobileOpen(
                                    (prevMobileOpen) => !prevMobileOpen
                                )
                            }
                        >
                            <MenuIcon />
                        </IconButton>
                    )}
                    <TextField
                        className={classes.search}
                        onKeyPress={() => {}}
                        // value={}
                        onChange={() => {}}
                        variant="standard"
                        InputProps={{
                            // className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div>
                        <Button component={Link} to="/cart" color="black">
                            <Badge badgeContent={cartData.length} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </Button>
                        {!isAuthenticated ? (
                            <Button
                                component={Link}
                                to="/auth"
                                color="black"
                                onClick={() => {}}
                            >
                                {!isMobile && <>Đăng nhập &nbsp;</>}
                                <AccountCircle />
                            </Button>
                        ) : (
                            <>
                                <Button
                                    color="black"
                                    onClick={handleClickAuth}
                                    onMouseOver={handleClickAuth}
                                    onMouseLeave={handleCloseHoverAuth}
                                >
                                    <Avatar sx={{ width: 32, height: 32 }} />
                                    {!isMobile && <>&nbsp; {user?.name}</>}
                                </Button>
                                <Menu
                                    // className={classes.dropdown}
                                    anchorEl={anchorElAuth}
                                    keepMounted
                                    open={Boolean(anchorElAuth)}
                                    onClose={handleCloseAuth}
                                    MenuListProps={{
                                        onMouseEnter: handleHoverAuth,
                                        onMouseLeave: handleCloseHoverAuth,
                                        style: { pointerEvents: 'auto' },
                                    }}
                                    anchorOrigin={{
                                        horizontal: 'left',
                                        vertical: 'bottom',
                                    }}
                                    PopoverClasses={{
                                        root: classes.popOverRoot,
                                    }}
                                    PaperProps={{
                                        style: {
                                            width: !isMobile ? 160 : 140,
                                        },
                                    }}
                                >
                                    <Link
                                        to="/profile"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
                                        <MenuItem onClick={handleCloseAuth}>
                                            Trang cá nhân
                                        </MenuItem>
                                    </Link>
                                    <Link
                                        to="/"
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                        }}
                                    >
                                        <MenuItem onClick={handleLogout}>
                                            Đăng xuất
                                        </MenuItem>
                                    </Link>
                                </Menu>
                            </>
                        )}
                    </div>
                </Toolbar>
                {!isMobile && (
                    <Toolbar className={classes.nav}>
                        <SecondNavbar
                            handleClick={handleClick}
                            handleCloseHover={handleCloseHover}
                            spacing={3}
                            direction="row"
                        />
                    </Toolbar>
                )}
            </AppBar>
            <div>
                <nav className={classes.drawer}>
                    {isMobile && (
                        <Drawer
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            ModalProps={{ keepMounted: true }}
                            onClose={() =>
                                setMobileOpen(
                                    (prevMobileOpen) => !prevMobileOpen
                                )
                            }
                            classes={{ paper: classes.drawerPaper }}
                        >
                            <Link to="/" className={classes.responsiveLogo}>
                                <img style={{ margin: '20px 0' }} src={logo} />
                            </Link>
                            <SecondNavbar
                                handleClick={handleClick}
                                handleCloseHover={handleCloseHover}
                                spacing={2}
                                direction="column"
                            />
                        </Drawer>
                    )}
                </nav>
                <Menu
                    className={classes.dropdown}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    MenuListProps={{
                        onMouseEnter: handleHover,
                        onMouseLeave: handleCloseHover,
                        style: { pointerEvents: 'auto' },
                    }}
                    anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    PopoverClasses={{
                        root: classes.popOverRoot,
                    }}
                    PaperProps={{
                        style: {
                            width: !isMobile ? 400 : 240,
                        },
                    }}
                >
                    {isFetching ? (
                        <MenuItem onClick={handleClose}>
                            Đang tải danh mục...
                        </MenuItem>
                    ) : (
                        data.map((category) => (
                            <Link
                                key={category.id}
                                to={`/products?page=${1}&limit=${LIMIT}&cat=${category.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    {category.name}
                                </MenuItem>
                            </Link>
                        ))
                    )}
                </Menu>
            </div>
        </>
    );
};

export default Navbar;
