import { Container, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import {
  PASSWORD_REGEX
} from "../../utils/globalVariables";
import {
  validateEmail, validatePhoneNumber
} from "../../utils/validateString";
import AddressDetails from "./AddressDetails";
import PasswordChange from "./PasswordChange";
import ProfileDetails from "./ProfileDetails";
import SideBar from "./SideBar";
import useStyles from "./styles";

const address = [
  {
    id: 1,
    name: "Phạm Phi Anh",
    phone: "0909090909",
    address:
      "1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
  },
  {
    id: 2,
    name: "Nguyễn Hữu Đăng",
    phone: "554122589",
    address:
      "484 Đ. Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minh",
  },
  {
    id: 3,
    name: "Mai Thanh Nhã",
    phone: "441201474",
    address: "242 Đ. Phạm Văn Đồng, Thành phố, Thủ Đức, Thành phố Hồ Chí Minh",
  },
  {
    id: 4,

    name: "Phạm Phi Anh",
    phone: "0909090909",
    address:
      "1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
  },
  {
    id: 5,

    name: "Nguyễn Hữu Đăng",
    phone: "554122589",
    address:
      "484 Đ. Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minh",
  },
  {
    id: 6,

    name: "Mai Thanh Nhã",
    phone: "441201474",
    address: "242 Đ. Phạm Văn Đồng, Thành phố, Thủ Đức, Thành phố Hồ Chí Minh",
  },
];

const Profile = () => {
  const classes = useStyles();

  const [navSelection, setNavSelection] = useState("profile");
  const [userInfo, setUserInfo] = useState({
    name: "phianh",
    username: "phamphianh",
    email: "pa@gmail.com",
    phone: "03300333",
    gender: "male",
  });
  const [birthday, setBirthday] = useState(dayjs("2022-04-07"));
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [emailValid, setEmailValid] = useState(true);
  const [newPasswordValid, setNewPasswordValid] = useState(true);
  const [confirmNewPasswordValid, setConfirmNewPasswordValid] = useState(true);

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    setUserInfo((prev) => ({ ...prev, gender: gender }));
  };

  const handleNavSelectionChange = (value) => {
    setNavSelection(value);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setUserInfo((prev) => ({ ...prev, name: name }));
  };

  const handlePhoneNumberChange = (event) => {
    const phone = event.target.value;
    if (!validatePhoneNumber(phone))
      setUserInfo((prev) => ({ ...prev, phone: phone }));
  };

  const handleEmailChange = (event) => {
    const email = event.target.value;
    setUserInfo((prev) => ({ ...prev, email: email }));
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    setEmailValid(true);
  };

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
  return (
    <>
      <div className={classes.body}>
        <Typography
          letterSpacing="2px"
          fontSize="25px"
          fontWeight="normal"
          align="center"
          paddingBottom="40px"
          paddingTop="60px"
        >
          TRANG CÁ NHÂN
        </Typography>{" "}
        <Container maxWidth="lg">
          <div className={classes.root}>
            <SideBar
              classes={classes}
              handleNavSelectionChange={handleNavSelectionChange}
            />
            <Paper elevation={10}>
              <div className={classes.profileMain}>
                <div hidden={navSelection !== "profile"}>
                  <ProfileDetails
                    classes={classes}
                    userInfo={userInfo}
                    setUserInfo={setUserInfo}
                    emailValid={emailValid}
                    setEmailValid={setEmailValid}
                    birthday={birthday}
                    setBirthday={setBirthday}
                    handleNameChange={handleNameChange}
                    handlePhoneNumberChange={handlePhoneNumberChange}
                    handleEmailChange={handleEmailChange}
                    handleGenderChange={handleGenderChange}
                  />
                </div>

                <div hidden={navSelection !== "address"}>
                  <AddressDetails address={address} classes={classes} />
                </div>

                <div hidden={navSelection !== "changePassword"}>
                  <PasswordChange
                    classes={classes}
                    currentPassword={currentPassword}
                    newPassword={newPassword}
                    newPasswordValid={newPasswordValid}
                    confirmNewPassword={confirmNewPassword}
                    confirmNewPasswordValid={confirmNewPasswordValid}
                    handleCurrentPasswordChange={handleCurrentPasswordChange}
                    handleNewPasswordChange={handleNewPasswordChange}
                    handleComfirmNewPasswordChange={
                      handleComfirmNewPasswordChange
                    }
                  />
                </div>
              </div>
            </Paper>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Profile;
