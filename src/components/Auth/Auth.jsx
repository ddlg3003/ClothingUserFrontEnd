import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import {
  BLACK_LOGO,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  PHONE_REGEX,
  USERNAME_REGEX,
  RECOVERY_FLOW,
  RECOVERY_QUERY_STRING,
} from '../../utils/globalVariables';
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
  const [invalidEmail, setInvalidEmail] = useState({
    error: false,
    helperText: '',
  });
  const [invalidUsername, setInvalidUsername] = useState({
    error: false,
    helperText: '',
  });
  const [invalidPhone, setInvalidPhone] = useState({
    error: false,
    helperText: '',
  });
  const [invalidPassword, setInvalidPassword] = useState({
    error: false,
    helperText: '',
  });
  const [invalidRetypePassword, setInvalidRetypePassword] = useState({
    error: false,
    helperText: '',
  });

  const [loading, setLoading] = useState(false);
  const [enableButton, setEnableButton] = useState(false);

  const phoneInput = useRef();
  const emailInput = useRef();
  const usernameInput = useRef();
  const passwordInput = useRef();
  const retypePasswordInput = useRef();
  const logo = BLACK_LOGO;

  useEffect(() => {
    if (isRegister) {
      if (
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
      } else setEnableButton(false);
    } else {
      if (formData.username && formData.password) {
        setEnableButton(true);
      } else setEnableButton(false);
    }
  }, [formData, isRegister]);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const handleInvalid = (e, REGEX, setInvalidData, helperText) => {
    if (isRegister) {
      if (e.target.value.match(REGEX)) {
        setInvalidData((prev) => ({ ...prev, error: false, helperText: '' }));
      } else {
        setInvalidData((prev) => ({ ...prev, error: true, helperText }));
      }
    } else {
      if (e.target.value) {
        setInvalidData((prev) => ({ ...prev, error: false, helperText: '' }));
      } else {
        setInvalidData((prev) => ({ ...prev, error: true, helperText }));
      }
    }
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEmailChange = (e) => {
    return handleInvalid(
      e,
      EMAIL_REGEX,
      setInvalidEmail,
      'Không đúng dịnh dạng email',
    );
  };

  const handlePhoneChange = (e) => {
    return handleInvalid(
      e,
      PHONE_REGEX,
      setInvalidPhone,
      'Không đúng định dạng sđt',
    );
  };

  const handleUsernameChange = (e) => {
    const helperText = isRegister
      ? 'Username cần có 6 kí tự gổm chữ và số'
      : 'Vui lòng điền vào trường này';

    return handleInvalid(e, USERNAME_REGEX, setInvalidUsername, helperText);
  };

  const handlePasswordChange = (e) => {
    const helperText = isRegister
      ? 'Có 8-15 ký tự, chữ số, ký tự đặc biệt & in hoa'
      : 'Vui lòng điền vào trường này';

    return handleInvalid(e, PASSWORD_REGEX, setInvalidPassword, helperText);
  };

  const handleRetypePasswordChange = (e) => {
    if (formData.password !== '' && e.target.value === formData.password) {
      setInvalidRetypePassword((prev) => ({
        ...prev,
        error: false,
        helperText: '',
      }));
    } else {
      setInvalidRetypePassword((prev) => ({
        ...prev,
        error: true,
        helperText: 'Mật khẩu nhập lại không khớp',
      }));
    }

    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    setLoading(true);

    if (!isRegister) {
      const { data, status } = await getUserLogin(formData);

      if (status === 200) {
        dispatch(setUser(data));
        navigate(-1);
      } else {
        setToastData((prev) => ({
          ...prev,
          color: 'error',
          severity: 'error',
          message: 'SAI THÔNG TIN ĐĂNG NHẬP',
        }));
      }
    } else {
      const axiosRes = await signup({
        ...formData,
        name: formData.username,
        roles: ['USER'],
      });

      if (axiosRes.status === 200) {
        setToastData((prev) => ({
          ...prev,
          color: 'success',
          severity: 'success',
          message: 'ĐĂNG KÝ THÀNH CÔNG',
        }));
        setIsRegister((prev) => !prev);
      } else {
        // console.log(axiosRes);
        setToastData((prev) => ({
          ...prev,
          color: 'error',
          severity: 'error',
          message: axiosRes.response.data.message,
        }));
      }
    }

    setTimeout(() => {
      setLoading(false);
      setOpenToast(true);
    }, 250);
  };

  const switchAuthMode = () => {
    setIsRegister((prev) => !prev);
    if (isRegister) {
      if (
        phoneInput.current ||
        emailInput.current ||
        usernameInput.current ||
        passwordInput.current ||
        retypePasswordInput.current
      ) {
        setInvalidPhone((prev) => ({ ...prev, error: false, helperText: '' }));
        setInvalidEmail((prev) => ({ ...prev, error: false, helperText: '' }));
        setInvalidUsername((prev) => ({
          ...prev,
          error: false,
          helperText: '',
        }));
        setInvalidPassword((prev) => ({
          ...prev,
          error: false,
          helperText: '',
        }));
        setInvalidRetypePassword((prev) => ({
          ...prev,
          error: false,
          helperText: '',
        }));
        setFormData((prev) => ({ ...prev, ...initialFormState }));
        phoneInput.current.value = null;
        emailInput.current.value = null;
        usernameInput.current.value = null;
        passwordInput.current.value = null;
        retypePasswordInput.current.value = null;
      }
    } else {
      if (usernameInput.current || passwordInput.current) {
        setInvalidUsername((prev) => ({
          ...prev,
          error: false,
          helperText: '',
        }));
        setInvalidPassword((prev) => ({
          ...prev,
          error: false,
          helperText: '',
        }));
        setFormData((prev) => ({ ...prev, ...initialFormState }));
        usernameInput.current.value = null;
        passwordInput.current.value = null;
      }
    }
  };

  return (
    <Container>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="h4" marginBottom="20px">
          {isRegister ? 'Đăng ký' : 'Đăng nhập'}
        </Typography>
        <Link to="/">
          <img src={logo} />
        </Link>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Input
            name="username"
            label="Username"
            handleChange={handleUsernameChange}
            error={invalidUsername.error}
            helperText={invalidUsername.helperText}
            inputRef={usernameInput}
          />
          {isRegister ? (
            <>
              <Input
                name="phone"
                label="Số điện thoại"
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
          ) : null}
          <Input
            name="password"
            label="Mật khẩu"
            handleChange={handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
            handleShowPassword={handleShowPassword}
            helperText={invalidPassword.helperText}
            error={invalidPassword.error}
            inputRef={passwordInput}
          />
          {isRegister ? (
            <Input
              name="retypePassword"
              label="Nhập lại mật khẩu"
              handleChange={handleRetypePasswordChange}
              type={showPassword ? 'text' : 'password'}
              helperText={invalidRetypePassword.helperText}
              error={invalidRetypePassword.error}
              handleShowPassword={handleShowPassword}
              inputRef={retypePasswordInput}
            />
          ) : null}
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
            {isRegister ? 'Đăng ký' : 'Đăng nhập'}
          </LoadingButton>
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
                    to={`/recovery?${RECOVERY_QUERY_STRING.step}=${RECOVERY_FLOW.email}`}
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
                    <span onClick={switchAuthMode} className={classes.register}>
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
                    <span onClick={switchAuthMode} className={classes.register}>
                      Đăng nhập
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
  );
};

export default Auth;
