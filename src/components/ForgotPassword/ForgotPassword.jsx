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

  const queryValue = searchParams.get(RECOVERY_QUERY_STRING.step);

  useEffect(() => {
    if (queryValue !== RECOVERY_FLOW.email && !formData.email) {
      window.location.href = `/recovery?${RECOVERY_QUERY_STRING.step}=${RECOVERY_FLOW.email}`;
    }
  }, [queryValue]);

  // Enable button
  useEffect(() => {
    if (queryValue === RECOVERY_FLOW.email) {
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
    if (queryValue === RECOVERY_FLOW.update_password)
      window.location.href = `/recovery?${RECOVERY_QUERY_STRING.step}=${RECOVERY_FLOW.email}`;
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
      setInvalidData((prev) => ({ ...prev, error: false, helperText: '' }));
    } else {
      setInvalidData((prev) => ({ ...prev, error: true, helperText }));
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (e) => {
    return handleInvalid(
      e,
      EMAIL_REGEX,
      setInvalidEmail,
      'Vui lòng nhập đúng định dạng Email',
    );
  };

  const handleOtpChange = (e) => {
    return handleInvalid(e, OTP_REGEX, setInvalidOtp, 'Nhập mã gồm 6 chữ số');
  };

  const handlePasswordChange = (e) => {
    return handleInvalid(
      e,
      PASSWORD_REGEX,
      setInvalidPassword,
      'Có 8-15 ký tự, chữ số, ký tự đặc biệt & in hoa',
    );
  };

  const handleRetypePasswordChange = (e) => {
    if (e.target.value === formData.newPassword) {
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
        setSearchParams({
          [RECOVERY_QUERY_STRING.step]: RECOVERY_FLOW.update_password,
        });

        setToastData((prev) => ({
          ...prev,
          message:
            'ADNCloth đã gửi một Email cho bạn, vui lòng kiểm tra và nhập mã',
          color: 'success',
          severity: 'success',
        }));
      }
    } catch (e) {
      setToastData((prev) => ({
        ...prev,
        message: 'Đã có lỗi xảy ra vui lòng thử lại sau',
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
        console.log(response);
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
          message: 'Cập nhật mật khẩu thành công',
          color: 'success',
          severity: 'success',
        }));
        setOpenToast(true);
        window.location.href = '/auth';
      }
    } catch {
      setToastData((prev) => ({
        ...prev,
        message: 'Đã có lỗi xảy ra vui lòng thử lại sau',
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
          Khôi phục mật khẩu
        </Typography>
        <form
          className={classes.form}
          onSubmit={
            queryValue === RECOVERY_FLOW.email
              ? handleSendMail
              : handleResetPassword
          }
        >
          {queryValue === RECOVERY_FLOW.update_password && formData.email ? (
            <>
              <Input
                name="otp"
                label="Mã OTP"
                handleChange={handleOtpChange}
                error={invalidOtp.error}
                helperText={invalidOtp.helperText}
                // inputRef={emailInput}
              />
              <Input
                name="newPassword"
                label="Mật khẩu mới"
                handleChange={handlePasswordChange}
                error={invalidPassword.error}
                type={showPassword ? 'text' : 'password'}
                helperText={invalidPassword.helperText}
                handleShowPassword={() => setShowPassword((prev) => !prev)}
                // inputRef={emailInput}
              />
              <Input
                name="rePassword"
                label="Nhập lại mật khẩu"
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
              label="Nhập email"
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
              queryValue === RECOVERY_FLOW.email ? isLoading : isLoadingReset
            }
            disabled={!enableButton}
          >
            {queryValue === RECOVERY_FLOW.update_password && formData.email
              ? 'Cập nhật'
              : 'Gửi mã'}
          </LoadingButton>
        </form>
        <Typography variant="title1" fontSize="14px" marginBottom="20px">
          Nhớ mật khẩu?{' '}
          <Link color="#000" href="/auth">
            Về trang đăng nhập
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
