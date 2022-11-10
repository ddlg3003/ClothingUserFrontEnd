import { Container, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { PASSWORD_REGEX, SIDEBAR_STATE } from "../../utils/globalVariables";
import { validateEmail, validatePhoneNumber } from "../../utils/validateString";
import AddressDetails from "./AddressDetails";
import Favorites from "./Favorites";
import Orders from "./Orders";
import PasswordChange from "./PasswordChange";
import ProfileDetails from "./ProfileDetails";
import SideBar from "./SideBar";
import useStyles from "./styles";

const allOrders = [
  {
    id: 1,
    name: "Áo Polo nam Pique Cotton USA thấm hút tối đa (kẻ sọc)",
    price: 100000,
    type: "Đen, XL",
    amount: "1",
    img: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC05295-copy_73.jpg",
  },
];

const favorites = [
  {
    id: 0,
    name: "Kính chống nắng",
    price: 150000,
    img: "https://demo.themefisher.com/aviato/images/shop/cart/cart-1.jpg",
  },
  {
    id: 1,
    name: "Áo Polo nam Pique Cotton USA thấm hút tối đa (kẻ sọc)",
    price: 100000,
    img: "https://media.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/August2022/DSC05295-copy_73.jpg",
  },
];

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

  const [tabValue, setTabValue] = useState(false);

  const [navSelection, setNavSelection] = useState(SIDEBAR_STATE[0]);
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
    if (tabValue !== "orders") setTabValue(false);

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
                <div hidden={navSelection !== SIDEBAR_STATE[0]}>
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

                <div hidden={navSelection !== SIDEBAR_STATE[1]}>
                  <AddressDetails address={address} classes={classes} />
                </div>

                <div hidden={navSelection !== SIDEBAR_STATE[2]}>
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

                <div hidden={navSelection !== SIDEBAR_STATE[3]}>
                  <Favorites favorites={favorites} classes={classes} />
                </div>
                <div hidden={navSelection !== SIDEBAR_STATE[4]}>
                  <Orders
                    tabValue={tabValue}
                    setTabValue={setTabValue}
                    navSelection={navSelection}
                    setNavSelection={setNavSelection}
                    allOrders={allOrders}
                    classes={classes}
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
