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
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import useStyles from "./styles";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { increaseItem, decreaseItem, updateCart } from "../../features/cart";
import { Link } from "react-router-dom";
import { useGetCartQuery } from "../../services/clothing";
import { increaseCartItem, decreaseCartItem } from "../../utils/api";

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [openDeleteItemDialog, setOpenDeleteItemDialog] = useState("");

  const datas = useSelector((state) => state.cart.data);

  const handleCloseDeleteItem = () => {
    setOpenDeleteItemDialog("");
  };

  const handleClickDeleteItem = (id) => {
    setOpenDeleteItemDialog(id);
  };

  const handleIncrease = async ({ color, size, product_id: productId }) => {
    await increaseCartItem({ color, size, productId });
    window.location.reload();
  };

  const handleDecrease = async ({ color, size, product_id: productId }) => {
    await decreaseCartItem({ color, size, productId });
    window.location.reload();
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
        <Container size="md" sx={{ minHeight: "400px" }}>
          <TableContainer component={Paper}>
            <Table className={classes.itemsTable} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" width={120}>
                    <Typography fontSize="17px">Sản Phẩm</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "200px" }}></TableCell>
                  <TableCell align="left" sx={{ width: "130px" }}>
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
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div>
                        <Link to="/products/1" className={classes.itemLink}>
                          <img width={80} src={data.proImage} alt="" />
                        </Link>
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Stack direction="column">
                        <Link to="/products/1" className={classes.itemLink}>
                          <Typography
                            fontSize="16px"
                            maxWidth={300}
                            className={classes.itemName}
                            sx={{ color: "#000" }}
                          >
                            {data.proName}
                          </Typography>
                          <Typography
                            fontSize="16px"
                            color="text.secondary"
                            maxWidth={200}
                            className={classes.itemName}
                          >
                            Màu: {data.color}
                          </Typography>
                          <Typography
                            fontSize="16px"
                            color="text.secondary"
                            maxWidth={200}
                            className={classes.itemName}
                          >
                            Kích cỡ: {data.size}
                          </Typography>
                        </Link>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      <Typography className={classes.itemName} fontSize={18}>
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.price)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" width={170}>
                      <IconButton
                        size="small"
                        onClick={() => handleDecrease(data)}
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
                        value={data.quantity}
                        className={classes.inputField}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleIncrease(data)}
                      >
                        <AddIcon
                          fontSize="inherit"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        className={classes.itemName}
                        color="error"
                        fontSize={18}
                      >
                        {Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(data.price * data.quantity)}
                      </Typography>
                    </TableCell>
                    <TableCell width={100} align="left">
                      <IconButton
                        size="large"
                        onClick={() => handleClickDeleteItem(i)}
                      >
                        <ClearIcon
                          fontSize="inherit"
                          color="error"
                          className={classes.removeItemButton}
                        />
                      </IconButton>
                      <DeleteAlertDialog
                        open={openDeleteItemDialog === i}
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
            component={Link}
            to="/checkout"
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
