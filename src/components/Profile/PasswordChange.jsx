
import {
    Button, Divider,
    Grid, Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";

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
              
              variant="outlined"
              value={props.newPassword}
              onChange={props.handleNewPasswordChange}
              error={props.newPasswordValid === false}
            />
            <Typography color="red" hidden={props.newPasswordValid === true}>
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
              value={props.confirmNewPassword}
              onChange={props.handleComfirmNewPasswordChange}
              error={props.confirmNewPasswordValid === false}
            />
            <Typography color="red" hidden={props.confirmNewPasswordValid === true}>
              Mật khẩu không trùng khớp
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
