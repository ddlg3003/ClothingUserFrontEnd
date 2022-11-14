import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";

const NewAddressDialog = (props) => {
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
            color="white"
            variant="contained"
            component="label"
            style={{ color: "black" }}
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
};

export default NewAddressDialog;