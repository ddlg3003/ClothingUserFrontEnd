import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';

const DeleteAlertDialog = ({
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

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Bạn chắc chắn muốn xóa sản phẩm này?'}
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
            onClick={() =>
              handleConfirmDeleteClick({
                color: item.color,
                size: item.size,
                productId: item.product_id,
              })
            }
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteAlertDialog;
