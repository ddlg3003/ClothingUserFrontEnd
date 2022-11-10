import React, { useState, useEffect } from 'react';
import { BLACK_LOGO } from '../../utils/globalVariables';
import { AppBar, Toolbar, Drawer, Button, IconButton, useMediaQuery, Menu, MenuItem, Avatar } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SecondNavbar from '../SecondNavbar/SecondNavbar';
import { Link } from 'react-router-dom';
import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();
    let currentHovering = false;
    let currentAuthHovering = false;
    const logo = BLACK_LOGO;
    const isMobile = useMediaQuery('(max-width: 800px)');
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorElAuth, setAnchorElAuth] = useState(null);

    // Auth hover functions
    const handleClickAuth = (e) => {
        if (anchorElAuth !== e.currentTarget) {
            setAnchorElAuth(e.currentTarget);
        }
    }

    const handleHoverAuth = (e) => {
        currentAuthHovering = true;
    }

    const handleCloseAuth = () => {
        setAnchorElAuth(null);
    }

    const handleCloseHoverAuth = (e) => {
        currentAuthHovering = false;

        setTimeout(() => {
            if (!currentAuthHovering) {
                handleCloseAuth();
            }
        }, 50);
    }


    // Category hover functions
    const handleClick = (e) => {
        if (anchorEl !== e.currentTarget) {
            setAnchorEl(e.currentTarget);
        }
    }

    const handleHover = (e) => {
        currentHovering = true;
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleCloseHover = (e) => {
        currentHovering = false;

        setTimeout(() => {
            if (!currentHovering) {
                handleClose();
            }
        }, 50);
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {!isMobile && <Link to="/"><img src={logo} /></Link>}
                    {isMobile && (
                        <IconButton onClick={() => setMobileOpen(prevMobileOpen => !prevMobileOpen)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <TextField
                        className={classes.search}
                        onKeyPress={() => { }}
                        // value={}
                        onChange={() => { }}
                        variant="standard"
                        InputProps={{
                            // className: classes.input,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                    <div>
                        <Button component={Link} to="/cart" color="black">
                            <ShoppingCartIcon />
                        </Button>
                        {!isAuthenticated ?
                            (
                                <Button component={Link} to="/auth" color="black" onClick={() => { }}>
                                    {!isMobile && <>Đăng nhập &nbsp;</>}
                                    <AccountCircle />
                                </Button>
                            ) :
                            (
                                <>
                                    <Button 
                                        color="black"
                                        onClick={handleClickAuth}
                                        onMouseOver={handleClickAuth}
                                        onMouseLeave={handleCloseHoverAuth}
                                    >
                                        <Avatar 
                                            sx={{ width: 32, height: 32 }}
                                            src={'https://yt3.ggpht.com/yti/AJo0G0mXhiLDl1CtA0Q65KQgegDt_mRqPuePpPzUk6ao=s88-c-k-c0x00ffffff-no-rj-mo'}
                                        />
                                        {!isMobile && <>&nbsp; Gnad</>}
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
                                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
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
                                            style={{ textDecoration: 'none', color: 'black' }}
                                        >
                                            <MenuItem onClick={handleCloseAuth}>Trang cá nhân</MenuItem>
                                        </Link>
                                        <Link 
                                            to="/" 
                                            style={{ textDecoration: 'none', color: 'black' }}
                                        >
                                            <MenuItem onClick={handleCloseAuth}>Đăng xuất</MenuItem>
                                        </Link>
                                    </Menu>
                                </>
                            )
                        }
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
                            onClose={() => setMobileOpen(prevMobileOpen => !prevMobileOpen)}
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
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>Thời trang nam</MenuItem></Link>
                </Menu>
            </div>
        </>
    )
}

export default Navbar;