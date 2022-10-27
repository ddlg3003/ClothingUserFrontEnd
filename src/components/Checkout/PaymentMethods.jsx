import React from "react";
import {
  Stack,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import useStyles from "./styles";
import { useState } from "react";

const PaymentMethods = () => {
  const classes = useStyles();

  const [paymentTypeValue, setPaymentTypeValue] = useState("credit");
  const [creditMethod, setCreditMethod] = useState("VCB");

  const handlePaymentTypeChange = (e) => {
    setPaymentTypeValue(e.target.value);
  };

  const handleCreditMethod = (value) => {
    setCreditMethod(value);
    console.log(value);
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
          Liên kết tài khoản
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
                  width="50"
                  src="http://cdn.airpay.vn/images_v1/c134/icon_c13401_v001.png"
                />
                VCB
              </Stack>
            </ToggleButton>
            <ToggleButton
              onClick={() => handleCreditMethod("BIDV")}
              value="BIDV"
              aria-label="left aligned"
            >
              <Stack>
                <img
                  width="50"
                  src="http://cdn.airpay.vn/images_v1/c134/icon_c13400_v001.png"
                />
                BIDV
              </Stack>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
    </>
  );
};

export default PaymentMethods;
