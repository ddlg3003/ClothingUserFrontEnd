import { Button, Dialog, DialogTitle, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateAddress } from "../../features/address";
import { addOrChangeAddress } from "../../utils/api";



const UpdateAddressDialog = (props) => {
  const dispatch = useDispatch();


  const { onClose, open, address } = props;

  const [addressInfo, setAddressInfo] = useState({
    id: address.id,
    name: address.name,
    phoneNumber: address.phoneNumber,
    address: address.address,
  });

  const handleClose = () => {
    onClose();
  };

  const handleConfirmClick = async () => {
    const isChange = true;
    const data = await addOrChangeAddress(addressInfo, isChange);  
    dispatch(updateAddress(data));
    onClose();
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setAddressInfo((prev) => ({ ...prev, name: name }));
  };
  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    setAddressInfo((prev) => ({ ...prev, phoneNumber: phone }));
  };
  const handleAddressChange = (event) => {
    const address = event.target.value;
    setAddressInfo((prev) => ({ ...prev, address: address }));
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogTitle>Cập nhật địa chỉ</DialogTitle>
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
            value={addressInfo.phoneNumber}
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

export default UpdateAddressDialog;
