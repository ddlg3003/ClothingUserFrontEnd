import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";

import useStyles from "./styles";

function createData(name, price, amount, img, total) {
  return { name, price, amount, img, total };
}

const rows = [
  createData(
    "Kính chống nắng",
    159000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-1.jpg",
    30000
  ),
  createData(
    "Váy body",
    200000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-2.jpg",
    30000
  ),
  createData(
    "Khăn choàng",
    159000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
    30000
  ),
  createData(
    "Khăn choàng1",
    159000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
    30000
  ),
];

const CartItems = () => {
  const classes = useStyles();

  return (
    <>
      <Container sx="md">
        <TableContainer
          className={classes.TableContainer}
          component={Paper}
          elevation={2}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" width={120}>
                  <Typography fontWeight="bold" fontSize="17px">
                    Sản Phẩm
                  </Typography>
                </TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                  {" "}
                  <Typography fontSize="17px">Đơn Giá</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography fontSize="17px">Số Lượng</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontSize="17px">Thành Tiền</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    
                    <div>
                    <Link to="/products/1" className={classes.itemLink}>

                      <img width={80} src={row.img} alt="" />
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Stack direction="column">
                      <Link to="/products/1" className={classes.itemLink}>
                        <Typography
                          fontSize="18px"
                          maxWidth={200}
                          className={classes.itemName}
                          sx={{ color: "#000" }}
                        >
                          {row.name}
                        </Typography>
                        <Typography
                          fontSize="18px"
                          color="text.secondary"
                          maxWidth={200}
                          className={classes.itemName}
                        >
                          Đen, XL
                        </Typography>
                      </Link>
                    </Stack>
                  </TableCell>
                  <TableCell align="left">
                    <Typography className={classes.itemName} fontSize={18}>
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(row.price)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" width={170}>
                    <Typography fontSize="18px" className={classes.itemName}>
                      {row.amount}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      className={classes.itemName}
                      fontSize={18}
                      color="error"
                    >
                      {Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(row.total)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default CartItems;
