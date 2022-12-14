import React, { useState, useRef, useEffect } from 'react';
import { Container, Paper, Typography, Button, Divider, Grid } from '@mui/material';
import { BLACK_LOGO, EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX, USERNAME_REGEX, RECOVERY_FLOW, RECOVERY_QUERY_STRING } from '../../utils/globalVariables';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Input from '../Input/Input';
import Alert from '../Alert/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth';
import { getUserLogin, signup } from '../../utils/auth';
import LoginIcon from '@mui/icons-material/Login';
import { LoadingButton } from '@mui/lab';
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialFormState = {
        name: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        retypePassword: '',
    };
    const [openToast, setOpenToast] = useState(false);
    const [toastData, setToastData] = useState({
        color: '',
        severity: '',
        message: '',
    });

    const [formData, setFormData] = useState(initialFormState);
    const [isRegister, setIsRegister] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState({ error: false, helperText: '' });
    const [invalidUsername, setInvalidUsername] = useState({ error: false, helperText: '' });
    const [invalidPhone, setInvalidPhone] = useState({ error: false, helperText: '' });
    const [invalidPassword, setInvalidPassword] = useState({ error: false, helperText: '' });
    const [invalidRetypePassword, setInvalidRetypePassword] = useState({ error: false, helperText: '' });

    const [loading, setLoading] = useState(false);
    const [enableButton, setEnableButton] = useState(false);

    const phoneInput = useRef();
    const emailInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const retypePasswordInput = useRef();
    const logo = BLACK_LOGO;

    useEffect(() => {
        if(isRegister) {
            if(
                formData.email && 
                formData.password && 
                formData.phone && 
                formData.username && 
                formData.retypePassword &&
                formData.email.match(EMAIL_REGEX) &&
                formData.password.match(PASSWORD_REGEX) &&
                formData.phone.match(PHONE_REGEX) &&
                formData.username.match(USERNAME_REGEX) &&
                formData.retypePassword === formData.password
            ) {
                setEnableButton(true);
            }
            else 
                setEnableButton(false);
        } else {
            if(
                formData.username && 
                formData.password
            ) {
                setEnableButton(true);
            }
            else
                setEnableButton(false);
        }
    }, [formData, isRegister]);

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenToast(false);
    };

    const handleShowPassword = () => setShowPassword(prev => !prev);

    const handleInvalid = (e, REGEX, setInvalidData, helperText) => {
        if(isRegister) {
            if(e.target.value.match(REGEX)) {
                setInvalidData({ error: false, helperText: '' });
            }
            else {
                setInvalidData({ error: true, helperText });
            }
        }
        else {
            if(e.target.value) {
                setInvalidData({ error: false, helperText: '' });
            }
            else {
                setInvalidData({ error: true, helperText });
            }
        }
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleEmailChange = (e) => {
        return handleInvalid(e, EMAIL_REGEX, setInvalidEmail, 'Kh??ng ????ng d???nh d???ng email');
    }

    const handlePhoneChange = (e) => {
        return handleInvalid(e, PHONE_REGEX, setInvalidPhone, 'Kh??ng ????ng ?????nh d???ng s??t');
    }

    const handleUsernameChange = (e) => {
        const helperText = isRegister ? 'Username c???n c?? 6 k?? t??? g???m ch??? v?? s???' : 'Vui l??ng ??i???n v??o tr?????ng n??y';

        return handleInvalid(e, USERNAME_REGEX, setInvalidUsername, helperText);
    }

    const handlePasswordChange = (e) => {
        const helperText = isRegister ? 'C?? 8-15 k?? t???, ch??? s???, k?? t??? ?????c bi???t & in hoa' : 'Vui l??ng ??i???n v??o tr?????ng n??y';

        return handleInvalid(e, PASSWORD_REGEX, setInvalidPassword, helperText);
    }

    const handleRetypePasswordChange = (e) => {
        if(formData.password !== '' && e.target.value === formData.password) {
            setInvalidRetypePassword({ error: false, helperText: '' });
        }
        else {
            setInvalidRetypePassword({ error: true, helperText: 'M???t kh???u nh???p l???i kh??ng kh???p' });
        }

        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        
        setLoading(true);

        if(!isRegister) {
            const { data, status } = await getUserLogin(formData);

            if(status === 200) {
                dispatch(setUser(data));
                navigate(-1);
            }
            else {
                setToastData(prev => ({ ...prev, color: 'error', severity: 'error', message: 'SAI TH??NG TIN ????NG NH???P' }));
            }
        }
        else {
            const axiosRes = await signup({ ...formData, name: formData.username, roles: ["USER"] });

            if(axiosRes.status === 200) {
                setToastData(prev => ({ ...prev, color: 'success', severity: 'success', message: '????NG K?? TH??NH C??NG' }));
                setIsRegister(prev => !prev);
            }
            else {
                // console.log(axiosRes);
                setToastData(prev => ({ ...prev, color: 'error', severity: 'error', message: axiosRes.response.data.message }));
            }
        }
        
        setTimeout(() => {
            setLoading(false);
            setOpenToast(true);
        }, 250);
    }

    const switchAuthMode = () => {
        setIsRegister(prev => !prev);
        if(isRegister) {
            if(phoneInput.current || emailInput.current || usernameInput.current || passwordInput.current || retypePasswordInput.current) {
                setInvalidPhone({ error: false, helperText: '' });
                setInvalidEmail({ error: false, helperText: '' });
                setInvalidUsername({ error: false, helperText: '' });
                setInvalidPassword({ error: false, helperText: '' }); 
                setInvalidRetypePassword({ error: false, helperText: '' });
                setFormData(initialFormState);
                phoneInput.current.value = null;
                emailInput.current.value = null;
                usernameInput.current.value = null;
                passwordInput.current.value = null;
                retypePasswordInput.current.value = null;
            }
        }
        else {
            if(usernameInput.current || passwordInput.current) {
                setInvalidUsername({ error: false, helperText: '' });
                setInvalidPassword({ error: false, helperText: '' }); 
                setFormData(initialFormState);
                usernameInput.current.value = null;
                passwordInput.current.value = null;
            }
        }
    }

    return (
        <Container>
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h4" marginBottom="20px">{isRegister ? '????ng k??' : '????ng nh???p'}</Typography>
                <Link to="/"><img src={logo} /></Link>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Input 
                        name="username" 
                        label="Username" 
                        handleChange={handleUsernameChange}
                        error={invalidUsername.error} 
                        helperText={invalidUsername.helperText}   
                        inputRef={usernameInput}
                    />
                    {isRegister ? 
                        <>
                            <Input 
                                name="phone" 
                                label="S??? ??i???n tho???i" 
                                handleChange={handlePhoneChange}
                                error={invalidPhone.error} 
                                helperText={invalidPhone.helperText}   
                                inputRef={phoneInput}
                            />
                            <Input 
                                name="email" 
                                label="Email" 
                                handleChange={handleEmailChange} 
                                type="email" 
                                error={invalidEmail.error} 
                                helperText={invalidEmail.helperText}  
                                inputRef={emailInput} 
                            />
                        </>
                        : null 
                    }
                    <Input 
                        name="password" 
                        label="M???t kh???u" 
                        handleChange={handlePasswordChange} 
                        type={showPassword ? "text" : "password"} 
                        handleShowPassword={handleShowPassword}
                        helperText={invalidPassword.helperText}
                        error={invalidPassword.error}
                        inputRef={passwordInput}
                    />
                    {isRegister ? 
                        <Input 
                            name="retypePassword" 
                            label="Nh???p l???i m???t kh???u" 
                            handleChange={handleRetypePasswordChange} 
                            type={showPassword ? "text" : "password"} 
                            helperText={invalidRetypePassword.helperText}
                            error={invalidRetypePassword.error}
                            handleShowPassword={handleShowPassword}
                            inputRef={retypePasswordInput}
                        /> 
                        : null 
                    }
                    <LoadingButton 
                        variant="contained" 
                        color="black" 
                        style={{ color: 'white', padding: '16px', width: '100%' }} 
                        size="medium"
                        loadingPosition="end"
                        endIcon={<LoginIcon />}
                        type="submit" 
                        disabled={!enableButton}
                        loading={loading}
                    >
                        {isRegister ? '????ng k??' : '????ng nh???p'}
                    </LoadingButton>
                    {!isRegister ? (
                        <>
                            <div className={classes.divider}>
                                <Divider>Ho???c</Divider>
                            </div>
                            <Grid container className={classes.otherLogin}>
                                <Grid item>
                                    <Button color="black">
                                        <GoogleIcon fontSize="large" />
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button color="black">
                                        <FacebookIcon fontSize="large" />
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.options}>
                                <Grid item>
                                    <Typography 
                                        component={Link}
                                        to={`/recovery?${RECOVERY_QUERY_STRING[0]}=${RECOVERY_FLOW[0]}`}
                                        className={classes.text}
                                        variant="title1" 
                                        fontSize="14px" 
                                        marginBottom="20px"
                                    >
                                        Qu??n m???t kh???u?
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography 
                                        variant="title1" 
                                        fontSize="14px" 
                                        marginBottom="20px"
                                    >
                                        Ch??a l?? th??nh vi??n?&nbsp; 
                                        <span 
                                            onClick={switchAuthMode}
                                            className={classes.register}
                                        >
                                            ????ng k?? ngay
                                        </span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid container className={classes.otherLogin}>
                                <Grid item>
                                    <Typography 
                                        variant="title1" 
                                        fontSize="14px" 
                                        marginBottom="20px"
                                    >
                                        ???? c?? t??i kho???n?&nbsp; 
                                        <span 
                                            onClick={switchAuthMode}
                                            className={classes.register}
                                        >
                                            ????ng nh???p
                                        </span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </form>
            </Paper>
            <Alert 
                message={toastData.message}
                openToast={openToast} 
                handleCloseToast={handleCloseToast}
                color={toastData.color}
                severity={toastData.severity}    
            />
        </Container>
    )
}

export default Auth;