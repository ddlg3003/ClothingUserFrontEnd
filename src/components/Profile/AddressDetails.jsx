import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  TextField,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

function AddressDialog(props) {
  const initialState = {
    name: "",
    phone: "",
    address: "",
  };


  const { onClose, open } = props;
  const [addressInfo, setAddressInfo] = useState({
    name: "",
    phone: "",
    address: "",
  });




  const handleClose = () => {
    setAddressInfo(initialState);
    onClose();
  };

  const handleConfirmClick = () => {
    setAddressInfo(initialState);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setAddressInfo((prev) => ({ ...prev, name: name }));
  };
  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setAddressInfo((prev) => ({ ...prev, phone: phone }));
  };
  const handleAddressChange = (event) => {
    const address = event.target.value;
    setAddressInfo((prev) => ({ ...prev, address: address }));
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Địa chỉ mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Họ và tên"
            fullWidth
            variant="standard"
            value={addressInfo.name}
            onChange={handleNameChange}
          />
          <TextField
            margin="dense"
            label="Số điện thoại"
            fullWidth
            variant="standard"
            value={addressInfo.phone}
            onChange={handlePhoneChange}
          />
          <TextField
            margin="dense"
            label="Địa chỉ"
            fullWidth
            variant="standard"
            value={addressInfo.address}
            onChange={handleAddressChange}
          />
        </DialogContent>

        <DialogActions>
          <Button
            sx={{ mb: 1 }}
            color="black"
            variant="contained"
            component="label"
            style={{ color: "white" }}
            onClick={handleClose}
          >
            Trở lại
          </Button>
          <Button
            sx={{ mb: 1 }}
            color="black"
            variant="contained"
            component="label"
            style={{ color: "white" }}
            onClick={handleConfirmClick}
          >
            Hoàn thành
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const AddressDetails = (props) => {
  const [openNewAddressDialog, setOpenNewAddressDialog] = useState(false);
  const [openUpdateAddressDialog, setOpenUpdateAddressDialog] = useState(false);


  const handleClickUpdateAddress = (info) => {
    setOpenUpdateAddressDialog(true);
  };

  const handleCloseUpdateAddress = () => {
    setOpenUpdateAddressDialog(false);
  };

  const handleClickNewAddress = () => {
    setOpenNewAddressDialog(true);
  };
  const handleCloseNewAddress = () => {
    setOpenNewAddressDialog(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", mb: 1 }}>
        <Box sx={{ flexGrow: 1 }} className={props.classes.title}>
          Địa chỉ của tôi
        </Box>
        <Box className={props.classes.title}>
          <Button
            color="black"
            component="label"
            style={{ color: "white" }}
            size="large"
            variant="contained"
            onClick={handleClickNewAddress}
          >
            <AddIcon /> Thêm địa chỉ mới
          </Button>
          <AddressDialog
            open={openNewAddressDialog}
            onClose={handleCloseNewAddress}
          />
        </Box>
      </Box>

      <Divider />

      <Container sx={{ mt: 3 }}>
        {props.address.map((address, i) => (
          <div key={i}>
            <Box>
              <Grid container spacing={2} sx={{ mb: 5, mt: 4 }}>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                      fontSize={18}
                    >
                      {address.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontSize={18}
                    >
                      {address.phone}
                    </Typography>
                    <Typography
                      fontSize={18}
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {address.address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Box>
                    <Button
                      sx={{ mb: 1 }}
                      color="black"
                      variant="contained"
                      component="label"
                      style={{ color: "white" }}
                      startIcon={<EditIcon />}
                      onClick={() => handleClickUpdateAddress(address)}
                    >
                      Cập nhật
                    </Button>
                          {/* <AddressDialog
        open={openUpdateAddressDialog}
        onClose={handleCloseUpdateAddress}
        selectedAddress={address}
      /> */}
                  </Box>
                  <Box>
                    <Button
                      color="black"
                      variant="contained"
                      component="label"
                      style={{ color: "white" }}
                      startIcon={<DeleteIcon />}
                    >
                      Xóa
                    </Button>
                  </Box>{" "}
                </Grid>
              </Grid>
            </Box>
            <Divider />
          </div>
        ))}
      </Container>
    </>
  );
};

export default AddressDetails;
