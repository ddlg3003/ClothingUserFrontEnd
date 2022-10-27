import React from "react";
import {
  Stack,
  Button,
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
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box, Container } from "@mui/system";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import CartItems from "./CartItems";

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
        <List>
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

const ShippingAddresses = () => {
    const handleCloseChangeAddress = (value) => {
        setOpen(false);
        setSelectedValue(value);
      };
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState(address[0]);
  const handleClickChangeAddress = () => {
    setOpen(true);
  };
  return (
    <>
      <Container>
        <Box className={classes.addressBox} component={Paper} elevation={1}>
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
    </>
  );
};

export default ShippingAddresses;
