import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useDeleteAddressMutation } from '../../services/userApis';

const DeleteAlertDialog = (props) => {
  const { onClose, open, id } = props;

  const handleClose = () => {
    onClose();
  };

  const [deleteAddress] = useDeleteAddressMutation();

  const handleConfirmClick = async () => {
    await deleteAddress(id);
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn chắc chắn muốn xóa địa chỉ này?'}
        </DialogTitle>
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
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAlertDialog;
