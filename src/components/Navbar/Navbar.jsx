import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Drawer, Button, IconButton, useMediaQuery } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon, AccountCircle } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Navbar = () => {
    const classes = useStyles();
    const logo = 'https://fontmeme.com/permalink/221015/466d5aeb7170191e34604da1b59fb9b2.png';
    const isMobile = useMediaQuery('(max-width: 800px)');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    {!isMobile ? 
                        <>
                            <Link to="/"><img src={logo} /></Link>
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
                                    )
                                }}
                            />
                        </> : 
                        <>
                            <TextField 
                                onKeyPress={() => {}}
                                // value={}
                                onChange={() => {}}
                                variant="standard"
                                className={classes.search}
                                InputProps={{
                                    // className: classes.input,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />                        
                        </>
                    }
                    <div>
                        <Button color="secondary">
                            <ShoppingCartIcon />
                        </Button>
                        {!isAuthenticated && 
                            <Button color="secondary" onClick={() => {}}> 
                                {!isMobile && <>Đăng nhập &nbsp;</>}
                                <AccountCircle />
                            </Button>
                        }                           
                    </div>                    
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar;