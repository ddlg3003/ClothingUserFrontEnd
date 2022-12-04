import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StarsIcon from "@mui/icons-material/Stars";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ORDER_STATUS, URL_REGEX } from "../../utils/globalVariables";
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

  const handleClickRate = (id) => {
    setOpenRatingDialog(id);
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
                <Tab label="Chờ xác nhận" value="2" />
                <Tab label="Đang giao" value="3" />
                <Tab label="Đã giao" value="4" />
                <Tab label="Đã hủy" value="5" />
              </TabList>
            </Box>

            <TabPanel value="1">
              <Container
                sx={{
                  mt: 0,
                  height: "460px",
                  overflow: props.orders?.length > 0 ? "scroll" : "none",
                }}
              >
                {props.orders?.map((order, i) => (
                  <div key={i} style={{ marginTop: i > 0 ? "40px" : "0px" }}>
                    {order.transactionMapper.map((product, proIndex) => (
                      <Box key={`pro${proIndex}`}>
                        <Grid container spacing={2} sx={{ mb: 0, mt: 1 }}>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Link
                              to={`/products/${product.productName
                                .replace(URL_REGEX, "-")
                                .toLowerCase()}-i.${product.productId}`}
                              className={props.classes.favoriteItems}
                            >
                              <Grid container spacing={2}>
                                <Grid
                                  item
                                  sx={{ paddingLeft: "32px!important" }}
                                >
                                  <img
                                    src={product?.productImage}
                                    width={80}
                                    alt=""
                                  />
                                </Grid>
                                <Grid item xs>
                                  <Typography
                                    fontSize={18}
                                    gutterBottom
                                    component="div"
                                    sx={{ color: "black!important" }}
                                  >
                                    {product?.productName}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    Phân loại hàng: {product?.color} -{" "}
                                    {product?.size}
                                  </Typography>
                                  <Typography color="text.secondary">
                                    x{product?.tranQuantity}
                                  </Typography>
                                  <Typography
                                    color="error"
                                    fontWeight="bold"
                                    fontSize={20}
                                  >
                                    {Intl.NumberFormat("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    }).format(product?.tranUnitPrice)}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Link>
                          </Grid>

                          <Grid item>
                            {order?.ordStatus === ORDER_STATUS[2].status ? (
                              product?.commented ? (
                                <Button
                                  color="black"
                                  variant="contained"
                                  component="label"
                                  style={{ color: "white" }}
                                  startIcon={<StarsIcon />}
                                  disabled
                                >
                                  Đã đánh giá
                                </Button>
                              ) : (
                                <Box>
                                  <Button
                                    color="black"
                                    variant="contained"
                                    component="label"
                                    style={{ color: "white" }}
                                    startIcon={<StarsIcon />}
                                    onClick={() => handleClickRate(product?.id)}
                                  >
                                    Đánh giá
                                  </Button>
                                  <RatingDialog
                                    classes={props.classes}
                                    open={openRatingDialog === product?.id}
                                    onClose={handleCloseRatingDialog}
                                    orderDetails={product}
                                  />
                                </Box>
                              )
                            ) : (
                              <></>
                            )}
                          </Grid>
                        </Grid>
                        <Divider />
                      </Box>
                    ))}
                    <Divider />
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ background: "#Fbf9f8" }}
                    >
                      <Stack p={1}>
                        <Typography fontWeight="bold" fontSize={16}>
                          SĐT: {order?.ordPhone}
                        </Typography>
                        <Typography color="text.secondary">
                          {order?.ordAddress}
                        </Typography>
                        <Typography color="text.secondary">
                          {order?.ordDate}
                        </Typography>
                      </Stack>
                      <Chip
                        color={
                          ORDER_STATUS.find(
                            (o) => o.status === order?.ordStatus
                          ).color
                        }
                        variant="outlined"
                        icon={<FiberManualRecordIcon />}
                        label={
                          ORDER_STATUS.find(
                            (o) => o.status === order?.ordStatus
                          ).string
                        }
                      />

                      <Typography
                        p={1}
                        color="error"
                        fontWeight="bold"
                        fontSize={22}
                      >
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(order?.ordTotalPrice)}
                      </Typography>
                    </Stack>
                    <Divider />
                  </div>
                ))}
              </Container>
            </TabPanel>
            <TabPanel value="2">
              <Container sx={{ mt: 0, height: "460px", overflow: "scroll" }}>
                {props.orders
                  ?.filter(
                    (order) => order.ordStatus === ORDER_STATUS[0].status
                  )
                  .map((order, i) => (
                    <div key={i} style={{ marginTop: i > 0 ? "40px" : "0px" }}>
                      {order.transactionMapper.map((product, proIndex) => (
                        <Box key={`pro${proIndex}_pend`}>
                          <Grid container spacing={2} sx={{ mb: 0, mt: 1 }}>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Link
                                to={`/products/${product.productName
                                  .replace(URL_REGEX, "-")
                                  .toLowerCase()}-i.${product.productId}`}
                                className={props.classes.favoriteItems}
                              >
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    sx={{ paddingLeft: "32px!important" }}
                                  >
                                    <img
                                      src={product?.productImage}
                                      width={80}
                                      alt=""
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Typography
                                      fontSize={18}
                                      gutterBottom
                                      component="div"
                                      sx={{ color: "black!important" }}
                                    >
                                      {product?.productName}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      Phân loại hàng: {product?.color} -{" "}
                                      {product?.size}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      x{product?.tranQuantity}
                                    </Typography>
                                    <Typography
                                      color="error"
                                      fontWeight="bold"
                                      fontSize={20}
                                    >
                                      {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product?.tranUnitPrice)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Link>
                            </Grid>

                            <Grid item>
                              <Box>
                                {/* <Button
                              disabled
                              color="black"
                              variant="contained"
                              component="label"
                              style={{ color: "black" }}
                              startIcon={<LocalShippingIcon />}
                            >
                              Đã giao
                            </Button> */}
                              </Box>{" "}
                            </Grid>
                          </Grid>
                          <Divider />
                        </Box>
                      ))}
                      <Divider />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ background: "#Fbf9f8" }}
                      >
                        <Stack p={1}>
                          <Typography fontWeight="bold" fontSize={16}>
                            SĐT: {order?.ordPhone}
                          </Typography>
                          <Typography color="text.secondary">
                            {order?.ordAddress}
                          </Typography>
                          <Typography color="text.secondary">
                            {order?.ordDate}
                          </Typography>
                        </Stack>
                        <Chip
                          color={
                            ORDER_STATUS.find(
                              (o) => o.status === order?.ordStatus
                            ).color
                          }
                          variant="outlined"
                          icon={<FiberManualRecordIcon />}
                          label={
                            ORDER_STATUS.find(
                              (o) => o.status === order?.ordStatus
                            ).string
                          }
                        />

                        <Typography
                          p={1}
                          color="error"
                          fontWeight="bold"
                          fontSize={22}
                        >
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order?.ordTotalPrice)}
                        </Typography>
                      </Stack>
                      <Divider />
                    </div>
                  ))}
              </Container>
            </TabPanel>
            <TabPanel value="3">
              <Container sx={{ mt: 0, height: "460px", overflow: "scroll" }}>
                {props.orders
                  ?.filter(
                    (order) => order.ordStatus === ORDER_STATUS[1].status
                  )
                  .map((order, i) => (
                    <div key={i} style={{ marginTop: i > 0 ? "40px" : "0px" }}>
                      {order.transactionMapper.map((product, proIndex) => (
                        <Box key={`pro${proIndex}_deli`}>
                          <Grid container spacing={2} sx={{ mb: 0, mt: 1 }}>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Link
                                to={`/products/${product.productName
                                  .replace(URL_REGEX, "-")
                                  .toLowerCase()}-i.${product.productId}`}
                                className={props.classes.favoriteItems}
                              >
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    sx={{ paddingLeft: "32px!important" }}
                                  >
                                    <img
                                      src={product?.productImage}
                                      width={80}
                                      alt=""
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Typography
                                      fontSize={18}
                                      gutterBottom
                                      component="div"
                                      sx={{ color: "black!important" }}
                                    >
                                      {product?.productName}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      Phân loại hàng: {product?.color} -{" "}
                                      {product?.size}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      x{product?.tranQuantity}
                                    </Typography>
                                    <Typography
                                      color="error"
                                      fontWeight="bold"
                                      fontSize={20}
                                    >
                                      {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product?.tranUnitPrice)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Link>
                            </Grid>

                            <Grid item>
                              <Box>
                                {/* <Button
                              disabled
                              color="black"
                              variant="contained"
                              component="label"
                              style={{ color: "black" }}
                              startIcon={<LocalShippingIcon />}
                            >
                              Đã giao
                            </Button> */}
                              </Box>{" "}
                            </Grid>
                          </Grid>
                          <Divider />
                        </Box>
                      ))}
                      <Divider />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ background: "#Fbf9f8" }}
                      >
                        <Stack p={1}>
                          <Typography fontWeight="bold" fontSize={16}>
                            SĐT: {order?.ordPhone}
                          </Typography>
                          <Typography color="text.secondary">
                            {order?.ordAddress}
                          </Typography>
                          <Typography color="text.secondary">
                            {order?.ordDate}
                          </Typography>
                        </Stack>
                        <Chip
                          color={
                            ORDER_STATUS.find(
                              (o) => o.status === order?.ordStatus
                            ).color
                          }
                          variant="outlined"
                          icon={<FiberManualRecordIcon />}
                          label={
                            ORDER_STATUS.find(
                              (o) => o.status === order?.ordStatus
                            ).string
                          }
                        />

                        <Typography
                          p={1}
                          color="error"
                          fontWeight="bold"
                          fontSize={22}
                        >
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order?.ordTotalPrice)}
                        </Typography>
                      </Stack>
                      <Divider />
                    </div>
                  ))}
              </Container>
            </TabPanel>
            <TabPanel value="4">
              <Container sx={{ mt: 0, height: "460px", overflow: "scroll" }}>
                {props.orders
                  ?.filter(
                    (order) => order.ordStatus === ORDER_STATUS[2].status
                  )
                  .map((filteredOrder, i) => (
                    <div key={i} style={{ marginTop: i > 0 ? "40px" : "0px" }}>
                      {filteredOrder.transactionMapper.map(
                        (product, proIndex) => (
                          <Box key={`pro${proIndex}_done`}>
                            <Grid container spacing={2} sx={{ mb: 0, mt: 1 }}>
                              <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                              >
                                <Link
                                  to={`/products/${product.productName
                                    .replace(URL_REGEX, "-")
                                    .toLowerCase()}-i.${product.productId}`}
                                  className={props.classes.favoriteItems}
                                >
                                  <Grid container spacing={2}>
                                    <Grid
                                      item
                                      sx={{ paddingLeft: "32px!important" }}
                                    >
                                      <img
                                        src={product?.productImage}
                                        width={80}
                                        alt=""
                                      />
                                    </Grid>
                                    <Grid item xs>
                                      <Typography
                                        fontSize={18}
                                        gutterBottom
                                        component="div"
                                        sx={{ color: "black!important" }}
                                      >
                                        {product?.productName}
                                      </Typography>
                                      <Typography color="text.secondary">
                                        Phân loại hàng: {product?.color} -{" "}
                                        {product?.size}
                                      </Typography>
                                      <Typography color="text.secondary">
                                        x{product?.tranQuantity}
                                      </Typography>
                                      <Typography
                                        color="error"
                                        fontWeight="bold"
                                        fontSize={20}
                                      >
                                        {Intl.NumberFormat("vi-VN", {
                                          style: "currency",
                                          currency: "VND",
                                        }).format(product?.tranUnitPrice)}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Link>
                              </Grid>

                              <Grid item>
                                {product?.commented ? (
                                  <Button
                                    color="black"
                                    variant="contained"
                                    component="label"
                                    style={{ color: "white" }}
                                    startIcon={<StarsIcon />}
                                    disabled
                                  >
                                    Đã đánh giá
                                  </Button>
                                ) : (
                                  <Box>
                                    <Button
                                      color="black"
                                      variant="contained"
                                      component="label"
                                      style={{ color: "white" }}
                                      startIcon={<StarsIcon />}
                                      onClick={() =>
                                        handleClickRate(product?.id)
                                      }
                                    >
                                      Đánh giá
                                    </Button>
                                    <RatingDialog
                                      classes={props.classes}
                                      open={openRatingDialog === product?.id}
                                      onClose={handleCloseRatingDialog}
                                      orderDetails={product}
                                    />
                                  </Box>
                                )}
                              </Grid>
                            </Grid>
                            <Divider />
                          </Box>
                        )
                      )}
                      <Divider />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ background: "#Fbf9f8" }}
                      >
                        <Stack p={1}>
                          <Typography fontWeight="bold" fontSize={16}>
                            SĐT: {filteredOrder?.ordPhone}
                          </Typography>
                          <Typography color="text.secondary">
                            {filteredOrder?.ordAddress}
                          </Typography>
                          <Typography color="text.secondary">
                            {filteredOrder?.ordDate}
                          </Typography>
                        </Stack>
                        <Chip
                          color={
                            ORDER_STATUS.find(
                              (o) => o.status === filteredOrder?.ordStatus
                            ).color
                          }
                          variant="outlined"
                          icon={<FiberManualRecordIcon />}
                          label={
                            ORDER_STATUS.find(
                              (o) => o.status === filteredOrder?.ordStatus
                            ).string
                          }
                        />

                        <Typography
                          p={1}
                          color="error"
                          fontWeight="bold"
                          fontSize={22}
                        >
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(filteredOrder?.ordTotalPrice)}
                        </Typography>
                      </Stack>
                      <Divider />
                    </div>
                  ))}
              </Container>
            </TabPanel>
            <TabPanel value="5">
              <Container sx={{ mt: 0, height: "460px", overflow: "scroll" }}>
                {props.orders
                  ?.filter(
                    (order) => order.ordStatus === ORDER_STATUS[3].status
                  )
                  .map((order, i) => (
                    <div key={i} style={{ marginTop: i > 0 ? "40px" : "0px" }}>
                      {order.transactionMapper.map((product, proIndex) => (
                        <Box key={`pro${proIndex}_can`}>
                          <Grid container spacing={2} sx={{ mb: 0, mt: 1 }}>
                            <Grid
                              item
                              xs
                              container
                              direction="column"
                              spacing={2}
                            >
                              <Link
                                to={`/products/${product.productName
                                  .replace(URL_REGEX, "-")
                                  .toLowerCase()}-i.${product.productId}`}
                                className={props.classes.favoriteItems}
                              >
                                <Grid container spacing={2}>
                                  <Grid
                                    item
                                    sx={{ paddingLeft: "32px!important" }}
                                  >
                                    <img
                                      src={product?.productImage}
                                      width={80}
                                      alt=""
                                    />
                                  </Grid>
                                  <Grid item xs>
                                    <Typography
                                      fontSize={18}
                                      gutterBottom
                                      component="div"
                                      sx={{ color: "black!important" }}
                                    >
                                      {product?.productName}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      Phân loại hàng: {product?.color} -{" "}
                                      {product?.size}
                                    </Typography>
                                    <Typography color="text.secondary">
                                      x{product?.tranQuantity}
                                    </Typography>
                                    <Typography
                                      color="error"
                                      fontWeight="bold"
                                      fontSize={20}
                                    >
                                      {Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(product?.tranUnitPrice)}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Link>
                            </Grid>

                            <Grid item>
                              <Box>
                                {/* <Button
                              disabled
                              color="black"
                              variant="contained"
                              component="label"
                              style={{ color: "black" }}
                              startIcon={<LocalShippingIcon />}
                            >
                              Đã giao
                            </Button> */}
                              </Box>{" "}
                            </Grid>
                          </Grid>
                          <Divider />
                        </Box>
                      ))}
                      <Divider />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ background: "#Fbf9f8" }}
                      >
                        <Stack p={1}>
                          <Typography fontWeight="bold" fontSize={16}>
                            SĐT: {order?.ordPhone}
                          </Typography>
                          <Typography color="text.secondary">
                            {order?.ordAddress}
                          </Typography>
                          <Typography color="text.secondary">
                            {order?.ordDate}
                          </Typography>
                        </Stack>
                        <Chip
                          color={
                            ORDER_STATUS.find(
                              (o) => o.status === order?.ordStatus
                            ).color
                          }
                          variant="outlined"
                          icon={<FiberManualRecordIcon />}
                          label={
                            ORDER_STATUS.find(
                              (o) => o.status === order?.ordStatus
                            ).string
                          }
                        />

                        <Typography
                          p={1}
                          color="error"
                          fontWeight="bold"
                          fontSize={22}
                        >
                          {Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order?.ordTotalPrice)}
                        </Typography>
                      </Stack>
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
