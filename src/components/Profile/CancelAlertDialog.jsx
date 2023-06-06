import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDenyOrderMutation } from '../../services/orderApis';

const CancelAlertDialog = ({
  onClose,
  open,
  item,
  handleConfirmDeleteClick,
}) => {
  // console.log(item);
  // console.log(item.product_id);
  const handleClose = () => {
    onClose();
  };

  const [cancelOrder] = useDenyOrderMutation();

  const handleConfirmCancelOrderClick = async () => {
    await cancelOrder(item);
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
          {'Bạn chắc chắn muốn hủy đơn này?'}
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
            onClick={handleConfirmCancelOrderClick}
          >
            Xác nhận hủy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CancelAlertDialog;
