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
import {
  useGetAllProvinceQuery,
  useGetDistrictByProvinceIdQuery,
  useGetCommuneByDistrictIdQuery,
} from '../../services/locationApis';
import Alert from '../Alert/Alert';

const NewAddressDialog = (props) => {
  const [toastData, setToastData] = useState({
    message: '',
    severity: '',
    color: '',
  });

  const [openToast, setOpenToast] = useState(false);

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };

  // province and district id state
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(-1);

  const { data: provinceData, isFetching: isFetchingProvinceData } =
    useGetAllProvinceQuery();

  const { data: districtData, isFetching: isFetchingDistrictData } =
    useGetDistrictByProvinceIdQuery(provinceId);

  const { data: communeData, isFetching: isFetchingCommuneData } =
    useGetCommuneByDistrictIdQuery(districtId);

  const initialState = {
    name: '',
    phoneNumber: '',
    address: '',
    province: '',
    district: '',
    commune: '',
  };

  const [addAddress] = useAddAddressMutation();
  const { onClose, open } = props;

  const [addressInfo, setAddressInfo] = useState(initialState);

  const handleClose = () => {
    setAddressInfo(initialState);
    onClose();
  };

  const handleConfirmClick = async () => {
    // check if not enough info
    const { name, phoneNumber, address, province, district, commune } =
      addressInfo;
    if (
      !name ||
      !phoneNumber ||
      !address ||
      !province ||
      !district ||
      !commune
    ) {
      setToastData((prev) => ({
        ...prev,
        message: 'VUI LÒNG NHẬP ĐỦ THÔNG TIN',
        severity: 'error',
        color: 'error',
      }));

      setOpenToast(true);
      return;
    }

    // manipulate string
    const addressForm = {
      name,
      phoneNumber,
      address: `${address}, ${commune}, ${district}, ${province}`,
    };

    setAddressInfo(initialState);
    onClose();

    await addAddress(addressForm);
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

  const handleProvinceChange = (event, value) => {
    if (value?.id) {
      setProvinceId(value.id);
      setAddressInfo((prev) => ({ ...prev, province: value.label }));
    }
    setAddressInfo((prev) => ({ ...prev, district: '', commune: '' }));
  };

  const handleDistrictChange = (event, value) => {
    if (value?.id) {
      setDistrictId(value.id);
      setAddressInfo((prev) => ({ ...prev, district: value.label }));
    }
    setAddressInfo((prev) => ({ ...prev, commune: '' }));
  };

  const handleCommuneChange = (event, value) => {
    if (value?.id) {
      setAddressInfo((prev) => ({ ...prev, commune: value.label }));
    }
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
              options={isFetchingProvinceData ? [] : provinceData}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Thành phố" />
              )}
              onChange={handleProvinceChange}
            />
            <Autocomplete
              key={provinceId}
              disabled={provinceId === 0}
              id="district-box"
              options={isFetchingDistrictData ? [] : districtData}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Quận" />}
              onChange={handleDistrictChange}
            />

            <Autocomplete
              key={districtId + provinceId + 63}
              disabled={districtId === -1}
              id="commune-box"
              options={isFetchingCommuneData ? [] : communeData}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Phường" />}
              onChange={handleCommuneChange}
            />
          </Stack>
          <TextField
            margin="dense"
            label="Địa chỉ chi tiết"
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
      <Alert
        message={toastData.message}
        openToast={openToast}
        handleCloseToast={handleCloseToast}
        color={toastData.color}
        severity={toastData.severity}
      />
    </div>
  );
};

export default NewAddressDialog;
