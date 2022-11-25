import React from "react";
import {
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import useStyles from "./styles";

const PaymentMethods = ({ paymentTypeValue, setPaymentTypeValue, creditMethod, setCreditMethod }) => {
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
        <Typography hidden={paymentTypeValue !== "COD"} fontSize="18px">
          Thanh toán khi nhận hàng Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển
          (nếu có) áp dụng cả với phí thu hộ.
        </Typography>
        <div hidden={paymentTypeValue !== "credit"}>
          <ToggleButtonGroup
            value={creditMethod}
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              onClick={() => handleCreditMethod("VCB")}
              value="VCB"
              aria-label="left aligned"
            >
              <Stack>
                <img
                  width="80"
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg"
                />
                Paypal
              </Stack>
            </ToggleButton>
            
          </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
