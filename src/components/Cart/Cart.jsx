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
    "Khăn choàng",
    159000,
    2,
    "https://demo.themefisher.com/aviato/images/shop/cart/cart-3.jpg",
    30000
  ),
];

const Cart = () => {
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
          GIỎ HÀNG
        </Typography>{" "}
        <Container sx="md">
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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div>
                        <img width={80} src={row.img} alt="" />
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography
                        fontSize="18px"
                        maxWidth={200}
                        className={classes.itemName}
                      >
                        {row.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontSize="18px" className={classes.itemName}>
                        {row.price}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width={170}>
                      <IconButton size="small">
                        <RemoveIcon
                          fontSize="inherit"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                      <input className={classes.inputField} />
                      <IconButton size="small">
                        <AddIcon
                          fontSize="inherit"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontSize="18px" className={classes.itemName}>
                        {row.total}
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
          <Typography fontSize="20px">Tổng thanh toán:
          </Typography>

          <Typography
            color="error"
            className={classes.title}
            fontWeight="bold"
            fontSize={20}
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
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
