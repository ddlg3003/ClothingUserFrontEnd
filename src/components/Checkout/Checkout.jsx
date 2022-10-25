import React from "react";
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
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Container } from "@mui/system";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

const address = [
  "1 Đ. Võ Văn Ngân, Linh Chiểu, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh",
  "484 Đ. Lê Văn Việt, Tăng Nhơn Phú A, Quận 9, Thành phố Hồ Chí Minh",
  "242 Đ. Phạm Văn Đồng, Thành phố, Thủ Đức, Thành phố Hồ Chí Minh",
];

function AddressSelectionDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Địa chỉ của tôi</DialogTitle>
      <List sx={{ pt: 0 }}>
        {address.map((address) => (
          <ListItem
            button
            onClick={() => handleListItemClick(address)}
            key={address}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <LocationOnIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={address} />
          </ListItem>
        ))}

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("addAddress")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Thêm Địa Chỉ Mới" />
        </ListItem>
      </List>
    </Dialog>
  );
}

AddressSelectionDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

const Checkout = () => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(address[0]);

  const handleClickChangeAddress = () => {
    setOpen(true);
  };

  const handleCloseChangeAddress = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

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
        <Container>
          <Box className={classes.addressBox} component={Paper} elevation="1">
            <div>
              <LocationOnIcon fontSize="small" sx={{ color: "black" }} />
              <Typography
                paddingTop="5px"
                marginLeft="4px"
                fontSize="23px"
                fontWeight="normal"
                align="center"
                paddingBottom="10px"
                display="inline-block"
              >
                Địa chỉ nhận hàng
              </Typography>{" "}
            </div>
            <div>
              <Typography
                paddingTop="0px"
                marginLeft="4px"
                fontSize="20px"
                fontWeight="bold"
                align="center"
                paddingBottom="0px"
                display="inline-block"
              >
                Phạm Phi Anh 0330009291
              </Typography>{" "}
              <div>
                <Typography
                  paddingTop="0px"
                  marginLeft="4px"
                  fontSize="20px"
                  fontWeight="normal"
                  align="left"
                  paddingBottom="0px"
                  display="inline-block"
                  marginRight="20px"
                >
                  {selectedValue}
                </Typography>{" "}
                <span>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickChangeAddress}
                  >
                    Thay đổi
                  </Button>
                  <AddressSelectionDialog
                    selectedValue={selectedValue}
                    open={open}
                    onClose={handleCloseChangeAddress}
                  />
                </span>
              </div>
            </div>
          </Box>
        </Container>
        <Container sx="md">
          <TableContainer
            className={classes.TableContainer}
            component={Paper}
            elevation="2"
          >
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
                      <Typography fontSize="18px" className={classes.itemName}>
                        {row.amount}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography fontSize="18px" className={classes.itemName}>
                        {row.total}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Container>
          <Box
            className={classes.paymentTypeBox}
            component={Paper}
            elevation="1"
          >
            <div>
              <Typography
                paddingTop="5px"
                marginLeft="4px"
                fontSize="23px"
                fontWeight="normal"
                align="center"
                paddingBottom="10px"
                display="inline-block"
              >
                Phương thức thanh toán
              </Typography>{" "}
            </div>
            <div>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                  
                    value="Liên kết tài khoản"
                    control={<Radio />}
                    label="Liên kết tài khoản"
                  />
                  <FormControlLabel
                    value="Thanh toán khi nhận hàng"
                    control={<Radio />}
                    label="Thanh toán khi nhận hàng"
                  />
                  
                </RadioGroup>
              </FormControl>
            </div>
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
              sx={{ marginRight: "380px" }}
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
