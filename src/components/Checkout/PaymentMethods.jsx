import React from 'react';
import {
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import useStyles from './styles';

const PaymentMethods = ({
  paymentTypeValue,
  setPaymentTypeValue,
  creditMethod,
  setCreditMethod,
}) => {
  const classes = useStyles();

  const handlePaymentTypeChange = (e) => {
    setPaymentTypeValue(e.target.value);
  };

  const handleCreditMethod = (value) => {
    setCreditMethod(value);
  };
  return (
    <>
      <ToggleButtonGroup
        color="success"
        exclusive
        aria-label="Platform"
        value={paymentTypeValue}
        onChange={handlePaymentTypeChange}
        sx={{ pb: 2 }}
      >
        <ToggleButton size="large" value="credit">
          Thanh toán bằng ví điện tử
        </ToggleButton>
        <ToggleButton size="large" value="COD">
          Thanh toán khi nhận hàng
        </ToggleButton>
      </ToggleButtonGroup>
      <div className={classes.paymentContainer}>
        <Typography hidden={paymentTypeValue !== 'COD'} fontSize="18px">
          Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển
          (nếu có) áp dụng cả với phí thu hộ.
        </Typography>
        <div hidden={paymentTypeValue !== 'credit'}>
          <ToggleButtonGroup
            value={creditMethod}
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              onClick={() => handleCreditMethod('VNPAY')}
              value="VNPAY"
              aria-label="left aligned"
            >
              <Stack>
                <img
                  width="80"
                  src="data:image/png;base64,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"
                />
                VNPAY
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
