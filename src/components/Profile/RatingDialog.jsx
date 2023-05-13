import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { useAddCommentMutation } from '../../services/commentApis';
import { URL_REGEX } from '../../utils/globalVariables';

const RatingDialog = (props) => {
  const [addComment] = useAddCommentMutation();

  const { onClose, open, orderDetails } = props;

  const [ratings, setRatings] = useState({
    comRating: '2',
    comContent: '',
  });

  const handleCommentContent = (event) => {
    const content = event.target.value;
    setRatings((prev) => ({ ...prev, comContent: content }));
  };

  const handleStarRating = (event) => {
    const rate = event.target.value;
    setRatings((prev) => ({ ...prev, comRating: rate }));
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirmClick = async () => {
    console.log(orderDetails);
    await addComment({
      comContent: ratings.comContent,
      comRating: ratings.comRating,
      productId: orderDetails.productId,
      transactionId: orderDetails.id,
    });
    onClose();
    props.setToastData((prev) => ({
      ...prev,
      color: 'success',
      severity: 'success',
      message: 'Đánh giá thành công!',
    }));
    props.setOpenToast(true);
    window.location.reload();
  };

  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth="md">
        <DialogTitle>Đánh giá sản phẩm</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2} sx={{ mb: 3, mt: 2, ml: 1 }}>
              <Grid item xs container direction="column" spacing={2}>
                <Link
                  to={`/products/${orderDetails.productName
                    .replace(URL_REGEX, '-')
                    .toLowerCase()}-i.${orderDetails.productId}`}
                  className={props.classes.favoriteItems}
                >
                  <Grid container spacing={2}>
                    <Grid item>
                      <img src={orderDetails?.productImage} width={80} alt="" />
                    </Grid>
                    <Grid item xs>
                      <Typography
                        fontSize={18}
                        gutterBottom
                        component="div"
                        sx={{ color: 'black!important' }}
                      >
                        {orderDetails?.productName}
                      </Typography>
                      <Typography color="text.secondary">
                        Phân loại hàng: {orderDetails?.color} -{' '}
                        {orderDetails?.size}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>

              <Grid item>
                <Box></Box>{' '}
              </Grid>
            </Grid>
            <Stack direction="row" spacing={4}>
              <Typography color="black" fontSize={18}>
                Chất lượng sản phẩm
              </Typography>
              <Rating
                name="simple-controlled"
                value={ratings.comRating}
                onChange={handleStarRating}
              />
            </Stack>
            <TextField
              id="standard-multiline-static"
              label="Đánh giá"
              multiline
              rows={4}
              placeholder="Để lại đánh giá"
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              value={ratings.comContent}
              onChange={handleCommentContent}
            />
          </Box>
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

export default RatingDialog;
