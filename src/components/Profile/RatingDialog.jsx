import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const RatingDialog = (props) => {

  const { onClose, open, orderDetails } = props;

  const [ratings, setRatings] = useState({
    rate: "2",
    comment: "",
  });

  const handleStarRating = (event) => {
    const rate = event.target.value;
    setRatings((prev) => ({ ...prev, rate: rate }));
  };

  const handleClose = () => {
    onClose();
  };

  const handleConfirmClick = () => {
    // setAddressInfo(initialState);
  };

  return (
    <div>
      <Dialog open={open} fullWidth={true} maxWidth="md">
        <DialogTitle>Đánh giá sản phẩm</DialogTitle>
        <DialogContent>
          <Box>
            <Grid container spacing={2} sx={{ mb: 3, mt: 2, ml: 1 }}>
              <Grid item xs container direction="column" spacing={2}>
                <Link to="/products/1" className={props.classes.favoriteItems}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <img src={orderDetails.img} width={80} alt="" />
                    </Grid>
                    <Grid item xs>
                      <Typography fontSize={18} gutterBottom component="div">
                        {orderDetails.name}
                      </Typography>
                      <Typography color="text.secondary">
                        Phân loại hàng: {orderDetails.type}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>

              <Grid item>
                <Box></Box>{" "}
              </Grid>
            </Grid>
            <Stack direction="row" spacing={4}>
              <Typography color="black" fontSize={18}>
                Chất lượng sản phẩm
              </Typography>
              <Rating
                name="simple-controlled"
                value={ratings.rate}
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
            />
          </Box>
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

export default RatingDialog;
