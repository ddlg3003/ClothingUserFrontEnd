import LocalShippingIcon from "@mui/icons-material/LocalShipping";

import StarsIcon from "@mui/icons-material/Stars";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingDialog from "./RatingDialog";

const Orders = (props) => {
  const [openRatingDialog, setOpenRatingDialog] = useState(false);

  useEffect(() => {
    if (props.navSelection === "orders") {
        props.setTabValue("1");
    }
  }, [props.navSelection]);

  const handleCloseRatingDialog = () => {
    setOpenRatingDialog(false);
  };

  const handleClickRate = () => {
    setOpenRatingDialog(true);
  };

  const handleChangeTab = (event, newValue) => {
    props.setTabValue(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }} className={props.classes.title}>
          <TabContext value={props.tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Tất cả" value="1" />
                <Tab label="Đang giao" value="2" />
                <Tab label="Đã giao" value="3" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Container sx={{ mt: 3 }}>
                {props.allOrders.map((order, i) => (
                  <div key={i}>
                    <Box>
                      <Grid container spacing={2} sx={{ mb: 3, mt: 4 }}>
                        <Grid item xs container direction="column" spacing={2}>
                          <Link
                            to="/products/1"
                            className={props.classes.favoriteItems}
                          >
                            <Grid container spacing={2}>
                              <Grid item>
                                <img src={order.img} width={80} alt="" />
                              </Grid>
                              <Grid item xs>
                                <Typography
                                  fontSize={18}
                                  gutterBottom
                                  component="div"
                                >
                                  {order.name}
                                </Typography>
                                <Typography color="text.secondary">
                                  Phân loại hàng: {order.type}
                                </Typography>
                                <Typography color="text.secondary">
                                  x{order.amount}
                                </Typography>
                                <Typography
                                  color="error"
                                  fontWeight="bold"
                                  fontSize={20}
                                >
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(order.price)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Link>
                        </Grid>

                        <Grid item>
                          <Box>
                            <Button
                              disabled
                              color="black"
                              variant="contained"
                              component="label"
                              style={{ color: "black" }}
                              startIcon={<LocalShippingIcon />}
                            >
                              Đã giao
                            </Button>
                          </Box>{" "}
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider />
                  </div>
                ))}
              </Container>
            </TabPanel>
            <TabPanel value="2">
              <Container sx={{ mt: 3 }}>
                {props.allOrders.map((order, i) => (
                  <div key={i}>
                    <Box>
                      <Grid container spacing={2} sx={{ mb: 3, mt: 4 }}>
                        <Grid item xs container direction="column" spacing={2}>
                          <Link
                            to="/products/1"
                            className={props.classes.favoriteItems}
                          >
                            <Grid container spacing={2}>
                              <Grid item>
                                <img src={order.img} width={80} alt="" />
                              </Grid>
                              <Grid item xs>
                                <Typography
                                  fontSize={18}
                                  gutterBottom
                                  component="div"
                                >
                                  {order.name}
                                </Typography>
                                <Typography color="text.secondary">
                                  Phân loại hàng: {order.type}
                                </Typography>
                                <Typography color="text.secondary">
                                  x{order.amount}
                                </Typography>
                                <Typography
                                  color="error"
                                  fontWeight="bold"
                                  fontSize={20}
                                >
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(order.price)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Link>
                        </Grid>

                        <Grid item>
                          <Box></Box>{" "}
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider />
                  </div>
                ))}
              </Container>
            </TabPanel>
            <TabPanel value="3">
              <Container sx={{ mt: 3 }}>
                {props.allOrders.map((order, i) => (
                  <div key={i}>
                    <Box>
                      <Grid container spacing={2} sx={{ mb: 3, mt: 4 }}>
                        <Grid item xs container direction="column" spacing={2}>
                          <Link
                            to="/products/1"
                            className={props.classes.favoriteItems}
                          >
                            <Grid container spacing={2}>
                              <Grid item>
                                <img src={order.img} width={80} alt="" />
                              </Grid>
                              <Grid item xs>
                                <Typography
                                  fontSize={18}
                                  gutterBottom
                                  component="div"
                                >
                                  {order.name}
                                </Typography>
                                <Typography color="text.secondary">
                                  Phân loại hàng: {order.type}
                                </Typography>
                                <Typography color="text.secondary">
                                  x{order.amount}
                                </Typography>
                                <Typography
                                  color="error"
                                  fontWeight="bold"
                                  fontSize={20}
                                >
                                  {Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(order.price)}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Link>
                        </Grid>

                        <Grid item>
                          <Box>
                            <Button
                              color="black"
                              variant="contained"
                              component="label"
                              style={{ color: "white" }}
                              startIcon={<StarsIcon />}
                              onClick={handleClickRate}
                            >
                              Đánh giá
                            </Button>
                            <RatingDialog
                              classes={props.classes}
                              open={openRatingDialog}
                              onClose={handleCloseRatingDialog}
                              orderDetails={order}
                            />
                          </Box>{" "}
                        </Grid>
                      </Grid>
                    </Box>
                    <Divider />
                  </div>
                ))}
              </Container>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Orders;
