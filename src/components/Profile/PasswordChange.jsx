import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import ProfileDetails from "./ProfileDetails";

import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utils/validateString";
import AddressDetails from "./AddressDetails";
import useStyles from "./styles";

const PasswordChange = (props) => {
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
          {" "}
          <Grid item xs={4}>
            <Typography mt="20px">Mật Khẩu Hiện Tại</Typography>
          </Grid>
          <Grid item xs={8} mb="10px">
            <TextField
              width="1000px"
              id="outlined-basic"
              variant="outlined"
              value={props.currentPassword}
              onChange={props.handleCurrentPasswordChange}
              type="password"
            />
          </Grid>
          <Grid item xs={4}>
            <Typography mt="20px">Mật Khẩu Mới</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              type="password"
              id="outlined-basic"
              variant="outlined"
              value={props.newPassword}
              onChange={props.handleNewPasswordChange}
              error={props.newPasswordValid === false}
            />
            <Typography color="red" hidden={props.newPasswordValid === true}>
              Mật khẩu phải dài 8-16 ký tự, chứa ít nhất một ký tự viết hoa và
              một ký tự viết thường
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
              id="outlined-basic"
              variant="outlined"
              value={props.confirmNewPassword}
              onChange={props.handleComfirmNewPasswordChange}
              error={props.confirmNewPasswordValid === false}
            />
            <Typography color="red" hidden={props.confirmNewPasswordValid === true}>
              Mật khẩu và Mật khẩu xác nhận không giống nhau
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <p hidden="true">Save</p>
          </Grid>
          <Grid item xs={8}>
            <Button
              size="large"
              variant="contained"
              color="black"
              style={{ color: "white" }}
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
