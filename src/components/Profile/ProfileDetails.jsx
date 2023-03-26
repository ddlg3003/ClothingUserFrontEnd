import React, { useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useChangeProfileMutation } from '../../services/userApis';
import { isValidImage } from '../../utils/helperFunction';
import { useUploadAvatarMutation } from '../../services/userApis';
import dayjs from 'dayjs';
import { validateEmail, validatePhoneNumber } from '../../utils/validateString';
import { useGetProfileQuery } from '../../services/userApis';
import { LoadingButton } from '@mui/lab';

const ProfileDetails = (props) => {
  const [changeProfile] = useChangeProfileMutation();

  const { data: userInformation, isFetching: isFetchingUserInformation } =
    useGetProfileQuery();
  // image upload
  const [fileContent, setFileContent] = useState({
    content: '',
    file: '',
  });

  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();

  const openFileSelector = (e) => {
    // Check valid image to upload (<10mb, jpg/jpeg/png)
    if (isValidImage(e.target.files[0])) {
      // Set image for imageArr
      setFileContent((prev) => ({
        ...prev,
        content: URL.createObjectURL(e.target.files[0]), // URL for show in UI
        file: e.target.files[0], // file to upload to cloudinary
      }));
    } else {
      props.setOpenToast(true);
      props.setToastData((toast) => ({
        ...toast,
        color: 'error',
        severity: 'error',
        message: 'Vui lòng chọn định dạng JPEG/JPG/PNG và nhỏ hơn 10MB',
      }));
    }
  };

  const [birthday, setBirthday] = useState(dayjs('2022-04-07'));

  // const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    props.setUserInfo((prev) => ({ ...prev, ...userInformation }));
    setBirthday(userInformation?.dob);
    setFileContent((prev) => ({ ...prev, content: userInformation?.avatar }));
  }, [isFetchingUserInformation, userInformation]);

  const handleNameChange = (event) => {
    const name = event.target.value;
    if (name.length <= 45)
      props.setUserInfo((prev) => ({ ...prev, fullname: name }));
  };

  const handlePhoneNumberChange = (event) => {
    const phone = event.target.value;
    if (!validatePhoneNumber(phone) && phone.length <= 11)
      props.setUserInfo((prev) => ({ ...prev, phone: phone }));
  };

  // const handleEmailChange = (event) => {
  //   const email = event.target.value;
  //   props.setUserInfo((prev) => ({ ...prev, email: email }));
  //   if (!validateEmail(email)) {
  //     setEmailValid(false);
  //     return;
  //   }
  //   setEmailValid(true);
  // };

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    props.setUserInfo((prev) => ({ ...prev, gender: gender }));
  };

  const handleSubmit = async () => {
    const dob = dayjs(birthday).add(1, 'day');

    try {
      await changeProfile({ ...props.userInfo, dob });

      if (fileContent.file) {
        const formData = new FormData();
        formData.append('image', fileContent.file);

        await uploadAvatar(formData);
      }

      props.setOpenToast(true);
      props.setToastData((toast) => ({
        ...toast,
        color: 'success',
        severity: 'success',
        message: 'Sửa thông tin thành công',
      }));
    } catch (error) {
      props.setOpenToast(true);
      props.setToastData((toast) => ({
        ...toast,
        color: 'error',
        severity: 'error',
        message: 'Đã có lỗi xảy ra, vui lòng thử lại sau',
      }));
    }
  };

  return (
    <>
      <div className={props.classes.title}>Hồ sơ của tôi</div>
      <Divider />
      {isFetchingUserInformation ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress color="black" size="4rem" />
        </Box>
      ) : (
        <Stack
          direction="row"
          spacing={20}
          sx={{ justifyContent: 'space-around' }}
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
              <Grid item xs={4}>
                <Typography>Tên đăng nhập</Typography>
              </Grid>
              <Grid item xs={8} mb="10px">
                <Typography>{props.userInfo?.username}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography mt="20px">Tên</Typography>
              </Grid>
              <Grid item xs={8} mb="10px">
                <TextField
                  variant="outlined"
                  value={props.userInfo?.fullname}
                  onChange={handleNameChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography>Email</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography>{props.userInfo?.email}</Typography>
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
                  onChange={handlePhoneNumberChange}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography mt="10px">Giới tính</Typography>
              </Grid>
              <Grid item xs={8}>
                <FormControl>
                  <RadioGroup
                    value={
                      !props.userInfo?.gender ? 'male' : props.userInfo?.gender
                    }
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={handleGenderChange}
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
                </FormControl>{' '}
              </Grid>
              <Grid item xs={4}>
                <Typography mt="15px">Ngày sinh</Typography>
              </Grid>
              <Grid item xs={8} mb={2}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={birthday}
                    onChange={(newValue) => {
                      setBirthday(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <p hidden={true}>Save</p>
              </Grid>
              <Grid item xs={8}>
                <LoadingButton
                  size="large"
                  variant="contained"
                  color="black"
                  style={{ color: 'white' }}
                  onClick={handleSubmit}
                  loading={isUploading}
                >
                  Lưu
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
          <Stack direction="column" spacing={2} width={150}>
            <img
              src={
                fileContent.content
                  ? fileContent.content
                  : props.userInfo?.avatar
                  ? props.userInfo?.avatar
                  : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
              }
              alt={''}
              width={150}
              height={150}
              className={props.classes.image}
            />
            <Button
              variant="contained"
              component="label"
              color="black"
              style={{ color: 'white' }}
              disabled={isUploading}
            >
              Chọn ảnh
              <input
                name="image"
                accept="image/*"
                id="contained-button-file"
                type="file"
                hidden
                onChange={openFileSelector}
              />
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ProfileDetails;
