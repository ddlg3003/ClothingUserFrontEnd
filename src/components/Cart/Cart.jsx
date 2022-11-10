import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import useStyles from "./styles";
import DeleteAlertDialog from "./DeleteAlertDialog";

function createData(id, name, price, amount, img, total) {
  return { id, name, price, amount, img, total };
}

const rows = [
  createData(
    0,
    "Kính chống nắng",
    100000,
    300,
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
  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState("");

  const handleCloseDeleteItem = () => {
    setOpenDeleteItemDialog("");
  };

  const handleClickDeleteItem = (id) => {
    setOpenDeleteItemDialog(id);
  };
  const handleIncrease = (id, amount) => {
    const tempData = [...datas];
    tempData[id].amount++;
    tempData[id].total = tempData[id].price * tempData[id].amount;
    setDatas(tempData);
  };

  const handleDecrease = (id, amount) => {
    const tempData = [...datas];
    if (amount === 1) {
      handleClickDeleteItem(id);
      return;
    }

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
            <Table className={classes.itemsTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width={120}>
                    <Typography fontSize="17px">Sản Phẩm</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "200px" }}></TableCell>
                  <TableCell align="left" sx={{ width: "130px" }}>
                    {" "}
                    <Typography fontSize="17px">Đơn Giá</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography fontSize="17px">Số Lượng</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "130px" }}>
                    <Typography fontSize="17px">Số Tiền</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "80px" }}>
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
                      <IconButton
                        size="large"
                        onClick={() => handleClickDeleteItem(data.id)}
                      >
                        <ClearIcon
                          fontSize="inherit"
                          color="error"
                          className={classes.removeItemButton}
                        />
                        
                      </IconButton>
                      <DeleteAlertDialog
                          open={openDeleteItemDialog === data.id}
                          onClose={handleCloseDeleteItem}
                          item={data}
                        />
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
            }).format(
              datas.reduce((acc, data) => {
                return (acc = acc + data.total);
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
          >
            Mua Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
