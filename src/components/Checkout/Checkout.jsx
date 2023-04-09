import React, { useState } from 'react';
import { Button, Typography, Paper, Stack } from '@mui/material';
import { Box, Container } from '@mui/system';
import CartItems from './CartItems';
import ShippingAddresses from './ShippingAddresses';
import PaymentMethods from './PaymentMethods';
import { useGetUserAddressQuery } from '../../services/userApis';
import {
  useCreateOrderMutation,
  useCreateVNPAYOrderMutation,
} from '../../services/orderApis';
import { useNavigate } from 'react-router-dom';
import {
  SIDEBAR_STATE,
  PROFILE_QUERY_STRING,
} from '../../utils/globalVariables';
import useStyles from './styles';

const Checkout = () => {
  const navigate = useNavigate();

  const classes = useStyles();
  const cartItems = [...JSON.parse(sessionStorage.getItem('cartItems'))];

  const { data, isFetching } = useGetUserAddressQuery();

  const submitData = [...JSON.parse(sessionStorage.getItem('cartItems'))];

  const transformObject = ({ color, price, product_id, quantity, size }) => {
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

  const [paymentTypeValue, setPaymentTypeValue] = useState('credit');
  const [creditMethod, setCreditMethod] = useState('VNPAY');

  let payment = {};
  if (paymentTypeValue === 'COD') {
    payment.payment = 'COD';
    payment.shipping_fee = 30000;
  }

  const totalItemPrice = cartItems.reduce((acc, data) => {
    return (acc = acc + data.price * data.quantity);
  }, 0);

  const shipping_fee = totalItemPrice > 250000 ? 0 : 25000;

  const [createOrder] = useCreateOrderMutation();
  const [createVNPAYOrder] = useCreateVNPAYOrderMutation();

  const handleSubmit = async () => {
    try {
      if (paymentTypeValue === 'COD') {
        const response = await createOrder([newSubmitData, payment]);
        if (response?.error.originalStatus === 409) {
          alert(response?.error.data);
          return navigate(`/cart`);
        }

        navigate(
          `/profile?${PROFILE_QUERY_STRING.tab}=${SIDEBAR_STATE.orders}`,
        );
      } else {
        const { data: VNPAYData } = await createVNPAYOrder([
          newSubmitData,
          payment,
        ]);
        if (VNPAYData?.status !== '00') {
          alert('Đã có lỗi xảy ra');
          console.log(VNPAYData);
          return;
        }
        window.location.href = VNPAYData?.url;
      }
    } catch {
      alert('Đã có lỗi xảy ra');
    }

    sessionStorage.clear();
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
              </Typography>{' '}
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
            <Stack
              spacing={1}
              direction="column"
              sx={{ width: '300px', mr: '300px' }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={0}
              >
                <Typography fontSize="20px" mr={1} color="text.secondary">
                  Tổng tiền hàng:
                </Typography>

                <Typography
                  className={classes.title}
                  fontWeight="normal"
                  fontSize={20}
                  color="text.secondary"
                >
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalItemPrice)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={0}
              >
                <Typography fontSize="20px" mr={1} color="text.secondary">
                  Phí vận chuyển:
                </Typography>

                <Typography
                  className={classes.title}
                  fontWeight="normal"
                  fontSize={20}
                  color="text.secondary"
                >
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(shipping_fee)}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={0}
              >
                <Typography fontSize="20px" mr={1} mt={1}>
                  Tổng thanh toán:
                </Typography>

                <Typography
                  color="error"
                  className={classes.title}
                  fontWeight="normal"
                  fontSize={28}
                >
                  {Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(shipping_fee + totalItemPrice)}
                </Typography>
              </Stack>
              <Button
                size="large"
                variant="outlined"
                color="black"
                className={classes.checkoutButton}
                sx={{ mr: '380px', mt: '10px', width: '300px' }}
                disabled={!isFetching && data.length ? false : true}
                onClick={handleSubmit}
              >
                Đặt Hàng
              </Button>
            </Stack>
          </div>
          {/* <div></div>  */}
        </div>
      </div>
    </>
  );
};

export default Checkout;
