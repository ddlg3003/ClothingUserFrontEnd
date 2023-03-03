import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Autocomplete,
  Stack,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useAddAddressMutation } from '../../services/userApis';
import { validatePhoneNumber } from '../../utils/validateString';
import { useGetAllProvinceQuery } from '../../services/locationApis';

const NewAddressDialog = (props) => {
  const { data: provinceData, isFetching: isFetchingProvinceData } =
    useGetAllProvinceQuery();

  const initialState = {
    name: '',
    phoneNumber: '',
    address: '',
  };

  const [addAddress] = useAddAddressMutation();
  const { onClose, open } = props;
  const [addressInfo, setAddressInfo] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });

  const handleClose = () => {
    setAddressInfo(initialState);
    onClose();
  };

  const handleConfirmClick = async () => {
    setAddressInfo(initialState);
    onClose();

    await addAddress(addressInfo);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    if (name.length <= 45) setAddressInfo((prev) => ({ ...prev, name: name }));
  };
  const handlePhoneChange = (event) => {
    const phone = event.target.value;
    if (!validatePhoneNumber(phone) && phone.length <= 11)
      setAddressInfo((prev) => ({ ...prev, phoneNumber: phone }));
  };
  const handleAddressChange = (event) => {
    const address = event.target.value;
    if (address.length <= 255)
      setAddressInfo((prev) => ({ ...prev, address: address }));
  };

  return (
    <div>
      <Dialog open={open} fullWidth={true}>
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
            value={addressInfo.phoneNumber}
            onChange={handlePhoneChange}
          />
          <Stack direction="row" mt={2} spacing={1}>
            <Autocomplete
              id="province-box"
              options={provinceData}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Thành phố" />
              )}
            />
            <Autocomplete
              id="district-box"
              options={provinceData}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Quận" />}
            />
            <Autocomplete
              id="commune-box"
              options={provinceData}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Phường" />}
            />
          </Stack>
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
            style={{ color: 'black' }}
            onClick={handleClose}
          >
            Trở lại
          </Button>
          <Button
            sx={{ mb: 1 }}
            color="black"
            variant="contained"
            component="label"
            style={{ color: 'white' }}
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
