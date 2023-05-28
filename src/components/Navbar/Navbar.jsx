import React, { useState, useEffect } from 'react';
import { BLACK_LOGO, PRODUCT_QUERY_STRING } from '../../utils/globalVariables';
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
  Stack,
} from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecondNavbar from '../SecondNavbar/SecondNavbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetCategoriesQuery } from '../../services/catApis';
import { useGetCartQuery } from '../../services/cartApis';
// import { useGetProductsQuery } from '../../services/productApis';
import AutoCompleteSearch from './AutoCompleteSearch';
import { logout } from '../../features/auth';
import decode from 'jwt-decode';
import { isValidImage, useDebounce } from '../../utils/helperFunction';
import useStyles from './styles';
import { useGetProfileQuery } from '../../services/userApis';
import { useRef } from 'react';
import { updateImage } from '../../features/image';

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const { data: user } = useGetProfileQuery({
    skip: !isAuthenticated,
  });

  const { data: dataCartList } = useGetCartQuery({ skip: !isAuthenticated });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) dispatch(logout());
    }
  }, [location, dispatch]);

  // const cartData = useSelector((state) => state.cart.data);
  const { data, isFetching } = useGetCategoriesQuery();

  let currentHovering = false;
  let currentAuthHovering = false;

  const logo = BLACK_LOGO;
  const isMobile = useMediaQuery('(max-width: 800px)');

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElAuth, setAnchorElAuth] = useState(null);
  const [query, setQuery] = useState('');
  const [notOpenAutoComplete, setNotOpenAutoComplete] = useState(true);

  // Debounce search query
  const debouncedQuery = useDebounce(query, 500);

  // Handle search
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigate(
        `/products?${PRODUCT_QUERY_STRING.page}=1&${PRODUCT_QUERY_STRING.keyword}=${query}`,
      );
      setNotOpenAutoComplete(true);
      setQuery('');
    }
  };

  // handle click outside search text
  const searchRef = useRef(null);

  // Use effect to check when click outside of search div
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setNotOpenAutoComplete(true);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setNotOpenAutoComplete]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);

    if (e.target.value === '') {
      setNotOpenAutoComplete(true);
    } else {
      setNotOpenAutoComplete(false);
    }
  };
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

    window.location.href = '/auth';

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

  const openFileSelector = (e) => {
    if (isValidImage(e.target.files[0])) {
      dispatch(
        updateImage({
          content: URL.createObjectURL(e.target.files[0]), // URL for show in UI
          file: e.target.files[0], // file to upload to cloudinary
        }),
      );
      navigate('/products/search-by-image');
    } else {
      alert('error');
    }
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {!isMobile && (
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          )}
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div ref={searchRef} className={classes.search}>
            <Stack direction="row" spacing={1}>
              <TextField
                placeholder="Nhập tên sản phẩm"
                onKeyPress={handleKeyPress}
                value={query}
                sx={{ width: '100%' }}
                onChange={handleSearchChange}
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

              <Button component="label">
                <CameraAltIcon color="black" />
                <input
                  name="image"
                  accept="image/*"
                  id="contained-button-file"
                  type="file"
                  hidden
                  onChange={openFileSelector}
                />
              </Button>
            </Stack>
            {!isMobile ? (
              <AutoCompleteSearch
                hidden={notOpenAutoComplete}
                query={debouncedQuery}
                setQuery={setQuery}
                setNotOpenAutoComplete={setNotOpenAutoComplete}
              />
            ) : (
              <></>
            )}
          </div>

          <div>
            <Button component={Link} to="/cart" color="black">
              <Badge badgeContent={dataCartList?.length} color="error">
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
                <LoginIcon />
              </Button>
            ) : (
              <>
                <Button
                  color="black"
                  onClick={handleClickAuth}
                  onMouseOver={handleClickAuth}
                  onMouseLeave={handleCloseHoverAuth}
                >
                  <Avatar
                    sx={{ width: 32, height: 32 }}
                    src={user?.avatar ? user?.avatar : ''}
                  />
                  {!isMobile && <>&nbsp; {user?.username}</>}
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
                    <MenuItem onClick={handleCloseAuth}>Trang cá nhân</MenuItem>
                  </Link>
                  <Link
                    to="/"
                    style={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
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
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
            >
              <Link to="/" className={classes.responsiveLogo}>
                <img style={{ margin: '20px 0' }} src={logo} alt="" />
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
            <MenuItem onClick={handleClose}>Đang tải danh mục...</MenuItem>
          ) : (
            data.map((category) => (
              <Link
                key={category.id}
                to={`/products?${PRODUCT_QUERY_STRING.page}=${1}&${
                  PRODUCT_QUERY_STRING.cat
                }=${category.id}`}
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                <MenuItem onClick={handleClose}>{category.name}</MenuItem>
              </Link>
            ))
          )}
        </Menu>
      </div>
    </>
  );
};

export default Navbar;
