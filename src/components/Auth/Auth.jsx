import React, { useState, useRef, useEffect } from 'react';
import { Container, Paper, Typography, Button, Divider, Grid } from '@mui/material';
import { BLACK_LOGO, EMAIL_REGEX, PASSWORD_REGEX, PHONE_REGEX } from '../../utils/globalVariables';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Input from './Input';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Auth = () => {
    const classes = useStyles();
    const initialFormState = {
        email: '',
        phone: '',
        password: '',
        retypePassword: '',
    };
    const [formData, setFormData] = useState(initialFormState);
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState({ error: false, helperText: '' });
    const [invalidPhone, setInvalidPhone] = useState({ error: false, helperText: '' });
    const [invalidPassword, setInvalidPassword] = useState({ error: false, helperText: '' });
    const [invalidRetypePassword, setInvalidRetypePassword] = useState({ error: false, helperText: '' });
    const [enableButton, setEnableButton] = useState(false);
    const phoneInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const retypePasswordInput = useRef();
    const logo = BLACK_LOGO;

    useEffect(() => {
        if(isRegister) {
            if(
                formData.email && 
                formData.password && 
                formData.phone && 
                formData.retypePassword &&
                formData.email.match(EMAIL_REGEX) &&
                formData.password.match(PASSWORD_REGEX) &&
                formData.phone.match(PHONE_REGEX) &&
                formData.retypePassword === formData.password
            ) {
                setEnableButton(true);
            }
            else 
                setEnableButton(false);
        } else {
            if(
                formData.email && 
                formData.password &&
                formData.email.match(EMAIL_REGEX) &&
                formData.password.match(PASSWORD_REGEX)
            ) {
                setEnableButton(true);
            }
            else
                setEnableButton(false);
        }
    }, [formData, isRegister]);

    const handleShowPassword = () => setShowPassword(prev => !prev);

    const handleInvalid = (e, REGEX, setInvalidData, helperText) => {
        if(e.target.value.match(REGEX)) {
            setInvalidData({ error: false, helperText: '' });
        }
        else {
            setInvalidData({ error: true, helperText });
        }
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleEmailChange = (e) => {
        return handleInvalid(e, EMAIL_REGEX, setInvalidEmail, 'Không đúng dịnh dạng email');
    }

    const handlePhoneChange = (e) => {
        return handleInvalid(e, PHONE_REGEX, setInvalidPhone, 'Không đúng định dạng sđt');
    }

    const handlePasswordChange = (e) => {
        return handleInvalid(e, PASSWORD_REGEX, setInvalidPassword, 'Có 8-15 ký tự, chữ số, ký tự đặc biệt & in hoa');
    }

    const handleRetypePasswordChange = (e) => {
        if(formData.password !== '' && e.target.value === formData.password) {
            setInvalidRetypePassword({ error: false, helperText: '' });
        }
        else {
            setInvalidRetypePassword({ error: true, helperText: 'Mật khẩu nhập lại không khớp' });
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
        
    }

    const switchAuthMode = () => {
        setIsRegister(prev => !prev);
        if(isRegister) {
            if(phoneInput.current || emailInput.current || passwordInput.current || retypePasswordInput.current) {
                setInvalidPhone({ error: false, helperText: '' });
                setInvalidEmail({ error: false, helperText: '' });
                setInvalidPassword({ error: false, helperText: '' }); 
                setInvalidRetypePassword({ error: false, helperText: '' });
                setFormData(initialFormState);
                phoneInput.current.value = null;
                emailInput.current.value = null;
                passwordInput.current.value = null;
                retypePasswordInput.current.value = null;
            }
        }
        else {
            if(emailInput.current || passwordInput.current) {
                setInvalidEmail({ error: false, helperText: '' });
                setInvalidPassword({ error: false, helperText: '' }); 
                setFormData(initialFormState);
                emailInput.current.value = null;
                passwordInput.current.value = null;
            }
        }
    }

    return (
        <Container>
            <Paper variant="outlined" className={classes.paper}>
                <Typography variant="h4" marginBottom="20px">{isRegister ? 'Đăng ký' : 'Đăng nhập'}</Typography>
                <Link to="/"><img src={logo} /></Link>
                <form className={classes.form} onSubmit={() => {}}>
                    <Input 
                        name="email" 
                        label="Email" 
                        handleChange={handleEmailChange} 
                        type="email" 
                        error={invalidEmail.error} 
                        helperText={invalidEmail.helperText}  
                        inputRef={emailInput} 
                    />
                    {isRegister ? 
                        <Input 
                            name="phone" 
                            label="Số điện thoại" 
                            handleChange={handlePhoneChange}
                            error={invalidPhone.error} 
                            helperText={invalidPhone.helperText}   
                            inputRef={phoneInput}
                        /> 
                        : null 
                    }
                    <Input 
                        name="password" 
                        label="Mật khẩu" 
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
                            label="Nhập lại mật khẩu" 
                            handleChange={handleRetypePasswordChange} 
                            type={showPassword ? "text" : "password"} 
                            helperText={invalidRetypePassword.helperText}
                            error={invalidRetypePassword.error}
                            handleShowPassword={handleShowPassword}
                            inputRef={retypePasswordInput}
                        /> 
                        : null 
                    }
                    <Button 
                        variant="contained" 
                        color="black" 
                        style={{ color: 'white', padding: '16px', width: '100%' }} 
                        size="medium"
                        onClick={() => console.log(formData)}
                        disabled={!enableButton}
                    >
                        {isRegister ? 'Đăng ký' : 'Đăng nhập'}
                    </Button>
                    {!isRegister ? (
                        <>
                            <div className={classes.divider}>
                                <Divider>Hoặc</Divider>
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
                                        to="/"
                                        className={classes.text}
                                        variant="title1" 
                                        fontSize="14px" 
                                        marginBottom="20px"
                                    >
                                        Quên mật khẩu?
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography 
                                        variant="title1" 
                                        fontSize="14px" 
                                        marginBottom="20px"
                                    >
                                        Chưa là thành viên?&nbsp; 
                                        <span 
                                            onClick={switchAuthMode}
                                            className={classes.register}
                                        >
                                            Đăng ký ngay
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
                                        Đã có tài khoản?&nbsp; 
                                        <span 
                                            onClick={switchAuthMode}
                                            className={classes.register}
                                        >
                                            Đăng nhập
                                        </span>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;