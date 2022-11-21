import React, { useState } from "react";
import { Button, Typography, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import useStyles from "./styles";
import CartItems from "./CartItems";
import ShippingAddresses from "./ShippingAddresses";
import PaymentMethods from "./PaymentMethods";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserAddressQuery } from "../../services/clothing";
import { createOrder } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { SIDEBAR_STATE, PROFILE_QUERY_STRING } from "../../utils/globalVariables";
import { increaseItem, decreaseItem, updateCart } from "../../features/cart";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const classes = useStyles();
  const cartItems = [...JSON.parse(sessionStorage.getItem("cartItems"))];

  const { data, isFetching } = useGetUserAddressQuery();

  const submitData = [...JSON.parse(sessionStorage.getItem("cartItems"))];

  const transformObject = ({
    color,
    price,
    proImage,
    proName,
    product_id,
    quantity,
    size,
  }) => {
    return {
      quantity: quantity.toString(),
      unit_price: price.toString(),
      color,
      size: size.toString(),
      product_id: product_id.toString(),
    };
  };

  const newSubmitData = submitData.map((data) => {
    return transformObject(data);
  });

  const [paymentTypeValue, setPaymentTypeValue] = useState("credit");
  const [creditMethod, setCreditMethod] = useState("VCB");

  let payment = {};
  if (paymentTypeValue === "COD") {
    payment.payment = "COD";
    payment.shipping_fee = 30000;
  }

  const handleSubmit = async () => {
    // console.log([newSubmitData, payment]);
    await createOrder([newSubmitData, payment]);
    sessionStorage.clear();
    navigate(`/profile?${PROFILE_QUERY_STRING[0]}=${SIDEBAR_STATE[4]}`);
    dispatch(updateCart([]));
  };

  return (
    <>
      <div className={classes.root}>
        <Typography
          letterSpacing="2px"
          fontSize="25px"
          fontWeight="normal"
          align="center"
          paddingBottom="40px"
          paddingTop="60px"
        >
          THANH TOÁN
        </Typography>
        <ShippingAddresses />
        <CartItems cartItems={cartItems} />
        <Container>
          <Box
            className={classes.paymentTypeBox}
            component={Paper}
            elevation={1}
          >
            <div>
              <Typography
                paddingTop="5px"
                marginLeft="4px"
                fontSize="23px"
                fontWeight="normal"
                align="center"
                paddingBottom="30px"
                display="inline-block"
              >
                Phương thức thanh toán
              </Typography>{" "}
            </div>

            <PaymentMethods
              paymentTypeValue={paymentTypeValue}
              setPaymentTypeValue={setPaymentTypeValue}
              creditMethod={creditMethod}
              setCreditMethod={setCreditMethod}
            />
          </Box>
        </Container>
        <div className={classes.buttonContainer}>
          <div className={classes.totalText}>
            <Typography fontSize="20px">Tổng thanh toán:</Typography>

            <Typography
              color="error"
              className={classes.title}
              fontWeight="normal"
              fontSize={28}
            >
              {Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                cartItems.reduce((acc, data) => {
                  return (acc = acc + data.price * data.quantity);
                }, 0)
              )}
            </Typography>
          </div>

          <div>
            <Button
              size="large"
              variant="outlined"
              color="black"
              className={classes.checkoutButton}
              sx={{ mr: "380px" }}
              disabled={!isFetching && data.length ? false : true}
              onClick={handleSubmit}
            >
              Đặt Hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
