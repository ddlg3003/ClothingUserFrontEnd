import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useFilePicker } from "use-file-picker";
import { useGetAllOrdersQuery } from "../../services/orderApis";
import { useGetProfileQuery } from "../../services/userApis";
import {
  PROFILE_QUERY_STRING,
  SIDEBAR_STATE,
} from "../../utils/globalVariables";
import { validateEmail, validatePhoneNumber } from "../../utils/validateString";
import AddressDetails from "./AddressDetails";
import Favorites from "./Favorites";
import Orders from "./Orders";
import PasswordChange from "./PasswordChange";
import ProfileDetails from "./ProfileDetails";
import SideBar from "./SideBar";
import useStyles from "./styles";

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Init tab query string for user friendly url
  // Main query tab
  const tabParamInit = SIDEBAR_STATE.includes(
    searchParams.get(PROFILE_QUERY_STRING[0])
  )
    ? searchParams.get(PROFILE_QUERY_STRING[0])
    : SIDEBAR_STATE[0];

  const [tabValue, setTabValue] = useState(false);

  const [userInfo, setUserInfo] = useState({
    fullname: "",
    phone: "",
    gender: "",
  });
  const [birthday, setBirthday] = useState(dayjs("2022-04-07"));

  const [emailValid, setEmailValid] = useState(true);

  const [orders, setOrders] = useState();

  const { data: userInformation, isFetching: isFetchingUserInformation } =
    useGetProfileQuery();
  const {
    data: allUserOrders,
    isFetching: isFetchingUserOrders,
    refetch,
  } = useGetAllOrdersQuery();

  window.onpopstate = () => {
    if (window.location.href === "http://localhost:3000/profile?tab=orders")
      window.location.href = "/";
  };

  useEffect(() => {
    setUserInfo(userInformation);
    setBirthday(userInformation?.dob);
  }, [isFetchingUserInformation]);

  useEffect(() => {
    setOrders(allUserOrders);
  }, [isFetchingUserOrders]);

  useEffect(() => {
    refetch();
  }, []);

  // image upload
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 1,
    maxFileSize: 10, // in megabytes
  });

  const handleGenderChange = (event) => {
    const gender = event.target.value;
    setUserInfo((prev) => ({ ...prev, gender: gender }));
  };

  const handleNavSelectionChange = (value) => {
    if (tabValue !== SIDEBAR_STATE[4]) setTabValue(false);

    setSearchParams({ [PROFILE_QUERY_STRING[0]]: value });
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    if (name.length <= 45) setUserInfo((prev) => ({ ...prev, fullname: name }));
  };

  const handlePhoneNumberChange = (event) => {
    const phone = event.target.value;
    if (!validatePhoneNumber(phone) && phone.length <= 11)
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
              userInfo={userInfo}
            />
            <Paper elevation={10}>
              <div className={classes.profileMain}>
                {isFetchingUserInformation && isFetchingUserOrders ? (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress color="black" size="4rem" />
                  </Box>
                ) : (
                  <div hidden={tabParamInit !== SIDEBAR_STATE[0]}>
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
                      openFileSelector={openFileSelector}
                      filesContent={filesContent}
                    />
                  </div>
                )}

                <div hidden={tabParamInit !== SIDEBAR_STATE[1]}>
                  <AddressDetails classes={classes} />
                </div>

                <div hidden={tabParamInit !== SIDEBAR_STATE[2]}>
                  <PasswordChange classes={classes} />
                </div>

                <div hidden={tabParamInit !== SIDEBAR_STATE[3]}>
                  <Favorites classes={classes} />
                </div>
                <div hidden={tabParamInit !== SIDEBAR_STATE[4]}>
                  <Orders
                    tabValue={tabValue}
                    setTabValue={setTabValue}
                    navSelection={tabParamInit}
                    orders={orders}
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
