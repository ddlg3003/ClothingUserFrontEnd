import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
    Button, Divider,
    FormControl,
    FormControlLabel,
    Grid, Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useChangeProfileMutation } from "../../services/userApis";
import dayjs from "dayjs";

const ProfileDetails = (props) => {
  const [changeProfile] = useChangeProfileMutation();

  const handleSubmit = async () => {
    const dob = dayjs(props.birthday).add(1, 'day');
    await changeProfile( {...props.userInfo, dob} );
    alert("Thay đổi thông tin thành công!");
    window.location.reload();
  };
  return (
    <>
      <div className={props.classes.title}>Hồ sơ của tôi</div>
      <Divider />
      <Stack
        direction="row"
        spacing={20}
        sx={{ justifyContent: "space-around" }}
        mt={5}
      >
        <div>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
            {" "}
            <Grid item xs={4}>
              <Typography>Tên đăng nhập</Typography>
            </Grid>
            <Grid item xs={8} mb="10px">
              <Typography>
                {props.userInfo?.username}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography mt="20px">Tên</Typography>
            </Grid>
            <Grid item xs={8} mb="10px">
              <TextField
                variant="outlined"
                value={props.userInfo?.fullname}
                onChange={props.handleNameChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography>Email</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography>
                {props.userInfo?.email}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography width="300px" mt="20px">
                Số điện thoại
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                variant="outlined"
                value={props.userInfo?.phone}
                onChange={props.handlePhoneNumberChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography mt="10px">Giới tính</Typography>
            </Grid>
            <Grid item xs={8}>
              <FormControl>
                <RadioGroup
                  value={!props.userInfo?.gender ? "male" : props.userInfo?.gender}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={props.handleGenderChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Khác"
                  />
                </RadioGroup>
              </FormControl>{" "}
            </Grid>
            <Grid item xs={4}>
              <Typography mt="15px">Ngày sinh</Typography>
            </Grid>
            <Grid item xs={8} mb={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={props?.birthday}
                  onChange={(newValue) => {
                    props.setBirthday(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4}>
              <p hidden={true}>Save</p>
            </Grid>
            <Grid item xs={8}>
              <Button
                size="large"
                variant="contained"
                color="black"
                style={{ color: "white" }}
                onClick={handleSubmit}
              >
                Lưu
              </Button>
            </Grid>
          </Grid>
        </div>
        <Stack direction="column" spacing={2} width={150}>
          <img
            src={props.filesContent.length ? props.filesContent[0]?.content : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" }
            alt={props.filesContent ? props.filesContent[0]?.name : "image"}
            width={150}
            height={150}
            className={props.classes.image}
          />
          <Button
            variant="contained"
            component="label"
            color="black"
            style={{ color: "white" }}
            onClick={() => props.openFileSelector()}
          >
            Chọn ảnh
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileDetails;
