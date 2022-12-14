import { Button, Container, Paper, Typography, Link } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import Alert from '../Alert/Alert';
import { useSearchParams } from 'react-router-dom';
import {
  EMAIL_REGEX,
  RECOVERY_QUERY_STRING,
  RECOVERY_FLOW,
  PASSWORD_REGEX,
  OTP_REGEX,
} from '../../utils/globalVariables';
import {
  useSendOtpMutation,
  useResetPasswordMutation,
} from '../../services/forgotPasswordApis';
import useStyles from './styles';
import { LoadingButton } from '@mui/lab';

const ForgotPassword = () => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    rePassword: '',
  });

  const [invalidOtp, setInvalidOtp] = useState({
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
  const [invalidEmail, setInvalidEmail] = useState({
    error: false,
    helperText: '',
  });
  const [enableButton, setEnableButton] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const emailInput = useRef();
  const otpInput = useRef();
  const passwordInput = useRef();
  const retypePasswordInput = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const queryValue = searchParams.get(RECOVERY_QUERY_STRING[0]);

  useEffect(() => {
    if (queryValue !== RECOVERY_FLOW[0] && !formData.email) {
      window.location.href = `/recovery?${RECOVERY_QUERY_STRING[0]}=${RECOVERY_FLOW[0]}`;
    }
  }, [queryValue]);

  // Enable button
  useEffect(() => {
    if (queryValue === RECOVERY_FLOW[0]) {
      if (formData.email && formData.email.match(EMAIL_REGEX)) {
        setEnableButton(true);
      } else setEnableButton(false);
    } else {
      if (
        formData.otp &&
        formData.newPassword &&
        formData.rePassword &&
        formData.newPassword.match(PASSWORD_REGEX) &&
        formData.otp.match(OTP_REGEX) &&
        formData.rePassword === formData.newPassword
      ) {
        setEnableButton(true);
      } else setEnableButton(false);
    }
  }, [formData, queryValue]);

  // Reset email if return previous page
  window.onpopstate = () => {
    if (queryValue === RECOVERY_FLOW[1])
      window.location.href = `/recovery?${RECOVERY_QUERY_STRING[0]}=${RECOVERY_FLOW[0]}`;
  };

  const [openToast, setOpenToast] = useState(false);
  const [toastData, setToastData] = useState({
    color: '',
    severity: '',
    message: '',
  });

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  const handleInvalid = (e, REGEX, setInvalidData, helperText) => {
    if (e.target.value.match(REGEX)) {
      setInvalidData({ error: false, helperText: '' });
    } else {
      setInvalidData({ error: true, helperText });
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (e) => {
    return handleInvalid(
      e,
      EMAIL_REGEX,
      setInvalidEmail,
      'Vui l??ng nh???p ????ng ?????nh d???ng Email'
    );
  };

  const handleOtpChange = (e) => {
    return handleInvalid(e, OTP_REGEX, setInvalidOtp, 'Nh???p m?? g???m 6 ch??? s???');
  };

  const handlePasswordChange = (e) => {
    return handleInvalid(
      e,
      PASSWORD_REGEX,
      setInvalidPassword,
      'C?? 8-15 k?? t???, ch??? s???, k?? t??? ?????c bi???t & in hoa'
    );
  };

  const handleRetypePasswordChange = (e) => {
    if (e.target.value === formData.newPassword) {
      setInvalidRetypePassword({ error: false, helperText: '' });
    } else {
      setInvalidRetypePassword({
        error: true,
        helperText: 'M???t kh???u nh???p l???i kh??ng kh???p',
      });
    }

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const [resetPassword, { isLoading: isLoadingReset }] =
    useResetPasswordMutation();

  const handleSendMail = async (e) => {
    e.preventDefault();

    try {
      // Send OTP to mail checking
      const response = await sendOtp(formData);

      // Check if response is error
      if (response?.error) {
        setToastData((prev) => ({
          ...prev,
          message: response?.error.data,
          color: 'error',
          severity: 'error',
        }));
      }
      // Not error case then jump to next flow
      else {
        setSearchParams({ [RECOVERY_QUERY_STRING[0]]: RECOVERY_FLOW[1] });

        setToastData((prev) => ({
          ...prev,
          message:
            'ADNCloth ???? g???i m???t Email cho b???n, vui l??ng ki???m tra v?? nh???p m??',
            color: 'success',
            severity: 'success',
        }));
      }
    } catch (e) {
      setToastData((prev) => ({
        ...prev,
        message: '???? c?? l???i x???y ra vui l??ng th??? l???i sau',
        color: 'error',
        severity: 'error',
      }));
    }
    setOpenToast(true);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Reset password
      const response = await resetPassword(formData);

      // Check if response is error and status !== 200
      if (response?.error.originalStatus !== 200) {
        console.log(response)
        setToastData((prev) => ({
          ...prev,
          message: response?.error.data,
          color: 'error',
          severity: 'error',
        }));
        setOpenToast(true); 
      }
      // Success change password
      else {
        setToastData((prev) => ({
          ...prev,
          message: 'C???p nh???t m???t kh???u th??nh c??ng',
          color: 'success',
          severity: 'success',
        }));
        setOpenToast(true);
        window.location.href = '/auth';
      }
    } catch {
      setToastData((prev) => ({
        ...prev,
        message: '???? c?? l???i x???y ra vui l??ng th??? l???i sau',
        color: 'error',
        severity: 'error',
      }));

      setOpenToast(true);
    }
  };

  return (
    <Container>
      <Paper variant="outlined" className={classes.paper}>
        <Typography variant="h4" marginBottom="20px">
          Kh??i ph???c m???t kh???u
        </Typography>
        <form
          className={classes.form}
          onSubmit={
            queryValue === RECOVERY_FLOW[0]
              ? handleSendMail
              : handleResetPassword
          }
        >
          {queryValue === RECOVERY_FLOW[1] && formData.email ? (
            <>
              <Input
                name="otp"
                label="M?? OTP"
                handleChange={handleOtpChange}
                error={invalidOtp.error}
                helperText={invalidOtp.helperText}
                // inputRef={emailInput}
              />
              <Input
                name="newPassword"
                label="M???t kh???u m???i"
                handleChange={handlePasswordChange}
                error={invalidPassword.error}
                type={showPassword ? 'text' : 'password'}
                helperText={invalidPassword.helperText}
                handleShowPassword={() => setShowPassword((prev) => !prev)}
                // inputRef={emailInput}
              />
              <Input
                name="rePassword"
                label="Nh???p l???i m???t kh???u"
                handleChange={handleRetypePasswordChange}
                error={invalidRetypePassword.error}
                type={showPassword ? 'text' : 'password'}
                helperText={invalidRetypePassword.helperText}
                // inputRef={emailInput}
              />
            </>
          ) : (
            <Input
              name="email"
              label="Nh???p email"
              handleChange={handleEmailChange}
              error={invalidEmail.error}
              helperText={invalidEmail.helperText}
              // inputRef={emailInput}
            />
          )}
          <LoadingButton
            variant="contained"
            size="medium"
            style={{ padding: '16px', width: '100%', color: 'white' }}
            type="submit"
            color="black"
            loading={
              queryValue === RECOVERY_FLOW[0] ? isLoading : isLoadingReset
            }
            disabled={!enableButton}
          >
            {queryValue === RECOVERY_FLOW[1] && formData.email
              ? 'C???p nh???t'
              : 'G???i m??'}
          </LoadingButton>
        </form>
        <Typography variant="title1" fontSize="14px" marginBottom="20px">
          Nh??? m???t kh???u?{' '}
          <Link color="#000" href="/auth">
            V??? trang ????ng nh???p
          </Link>
        </Typography>
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

export default ForgotPassword;
