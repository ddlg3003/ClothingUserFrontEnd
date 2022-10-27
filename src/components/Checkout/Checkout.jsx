import React from "react";
import { Button, Typography, Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import useStyles from "./styles";
import CartItems from "./CartItems";
import ShippingAddresses from "./ShippingAddresses";
import PaymentMethods from "./PaymentMethods";

const Checkout = () => {
  const classes = useStyles();

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
        </Typography>{" "}

        <ShippingAddresses />

        <CartItems />

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

            <PaymentMethods />
            
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
              }).format(120000000)}
            </Typography>
          </div>

          <div>
            <Button
              size="large"
              variant="outlined"
              color="black"
              className={classes.checkoutButton}
              sx={{ mr: "380px" }}
            >
              Mua Hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
