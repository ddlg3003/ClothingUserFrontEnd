import React from "react";
import useStyles from "./styles";
import {
  Button,
  IconButton,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, Container } from "@mui/system";
import { useState } from "react";

function createData(id, name, price, amount, img, total) {
  return { id, name, price, amount, img, total };
}

const rows = [
  createData(
    0,
    "Kính chống nắng",
    100000,
    3,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-1.jpg",
    300000
  ),
  createData(
    1,
    "Váy body",
    200000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-2.jpg",
    400000
  ),
  createData(
    2,
    "Khăn choàng",
    200000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
    400000
  ),
  createData(
    3,
    "Khăn choàng",
    150000,
    4,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
    600000
  ),
];

const Cart = () => {
  const classes = useStyles();

  const [datas, setDatas] = useState(rows);

  const handleIncrease = (id, amount) => {
    const tempData = [...datas];
    tempData[id].amount++;
    tempData[id].total = tempData[id].price * tempData[id].amount;
    setDatas(tempData);
  };

  const handleDecrease = (id, amount) => {
    const tempData = [...datas];
    if (amount > 0) {
      tempData[id].amount--;
      tempData[id].total = tempData[id].price * tempData[id].amount;
    }

    setDatas(tempData);
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
          GIỎ HÀNG
        </Typography>{" "}
        <Container size="md">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width={120}>
                    <Typography fontSize="17px">Sản Phẩm</Typography>
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left">
                    {" "}
                    <Typography fontSize="17px">Đơn Giá</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="17px">Số Lượng</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography fontSize="17px">Số Tiền</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography width={80} fontSize="17px">
                      Thao Tác
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data, i) => (
                  <TableRow
                    key={data.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div>
                        <img width={80} src={data.img} alt="" />
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        fontSize="18px"
                        maxWidth={200}
                        className={classes.itemName}
                      >
                        {data.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontSize="18px" className={classes.itemName}>
                        {data.price}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width={170}>
                      <IconButton
                        size="small"
                        onClick={() => handleDecrease(data.id, data.amount)}
                      >
                        <RemoveIcon
                          fontSize="inherit"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                      <input
                        disabled={true}
                        readOnly={true}
                        onChange={() => {}}
                        value={data.amount}
                        className={classes.inputField}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleIncrease(data.id, data.amount)}
                      >
                        <AddIcon
                          fontSize="inherit"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontSize="18px" className={classes.itemName}>
                        {data.total}
                      </Typography>
                    </TableCell>
                    <TableCell width={100} align="left">
                      <IconButton size="large">
                        <ClearIcon
                          fontSize="inherit"
                          color="error"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>

      <div className={classes.buttonContainer}>
        <div className={classes.totalText}>
          <Typography fontSize="20px">Tổng thanh toán:</Typography>

          <Typography
            color="error"
            className={classes.title}
            fontWeight="bold"
            fontSize={20}
          >
            {Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(datas.reduce((acc, data) => {
              return acc = acc + data.total;
            }, 0))}
          </Typography>
        </div>
        <div>
          <Button
            size="large"
            variant="outlined"
            color="black"
            className={classes.checkoutButton}
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
