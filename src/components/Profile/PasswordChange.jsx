import React, { useState } from 'react';
import { Button, Divider, Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useChangePasswordMutation } from '../../services/userApis';
import { PASSWORD_REGEX } from '../../utils/globalVariables';
import { logout } from '../../features/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const PasswordChange = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleCurrentPasswordChange = (event) => {
    const curPassword = event.target.value;
    setCurrentPassword(curPassword);
  };

  const handleNewPasswordChange = (event) => {
    const newPass = event.target.value;
    setNewPassword(newPass);
    if (!newPass.match(PASSWORD_REGEX)) {
      setNewPasswordValid(false);
      return;
    }
    setNewPasswordValid(true);
  };

  const handleComfirmNewPasswordChange = (event) => {
    const confirmNewPass = event.target.value;
    setConfirmNewPassword(confirmNewPass);

    if (confirmNewPass !== newPassword) {
      setConfirmNewPasswordValid(false);
      return;
    }
    setConfirmNewPasswordValid(true);
  };

  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmNewPasswordValid, setConfirmNewPasswordValid] = useState(true);
  const [changePassword] = useChangePasswordMutation();

  const handleSubmit = async () => {
    if (!newPasswordValid || !confirmNewPasswordValid) {
      alert('Không đúng định dạng mật khẩu!');
      return;
    }

    const {
      error: { originalStatus },
    } = await changePassword({
      curPassword: currentPassword,
      newPassword,
      rePassword: confirmNewPassword,
    });

    if (originalStatus === 200) {
      alert(
        'Đổi mật khẩu thành công, vui lòng đăng nhập lại bằng mật khẩu mới!',
      );
      dispatch(logout());
      navigate('/auth');
    } else {
      alert('Mật khẩu không chính xác!');
    }
  };

  return (
    <>
      <div className={props.classes.title}>Đổi mật khẩu</div>
      <Divider />

      <div>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
          mt="10px"
        >
          {' '}
          <Grid item xs={4}>
            <Typography mt="20px">Mật Khẩu Hiện Tại</Typography>
          </Grid>
          <Grid item xs={8} mb="10px">
            <TextField
              width="1000px"
              variant="outlined"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              type="password"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography mt="20px">Mật Khẩu Mới</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="password"
              variant="outlined"
              value={newPassword}
              onChange={handleNewPasswordChange}
              error={newPasswordValid === false}
            />
            <Typography color="red" hidden={newPasswordValid === true}>
              Có 8-15 ký tự, chữ số, ký tự đặc biệt & in hoa
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography width="300px" mt="20px">
              Xác Nhận Mật Khẩu
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="password"
              variant="outlined"
              value={confirmNewPassword}
              onChange={handleComfirmNewPasswordChange}
              error={confirmNewPasswordValid === false}
            />
            <Typography color="red" hidden={confirmNewPasswordValid === true}>
              Mật khẩu không trùng khớp
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <p hidden={true}>Save</p>
          </Grid>
          <Grid item xs={8}>
            <Button
              size="large"
              variant="contained"
              color="black"
              style={{ color: 'white' }}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default PasswordChange;
