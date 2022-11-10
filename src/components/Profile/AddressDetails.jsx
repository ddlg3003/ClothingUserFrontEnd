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
import React, { useState } from "react";
import NewAddressDialog from "./NewAddressDialog";
import UpdateAddressDialog from "./UpdateAddressDialog";
import DeleteAlertDialog from "./DeleteAlertDialog";

const AddressDetails = (props) => {
  // Dialog's states
  const [openNewAddressDialog, setOpenNewAddressDialog] = useState(false);
  const [openUpdateAddressDialog, setOpenUpdateAddressDialog] = useState("");
  const [openDeleteAddressDialog, setOpenDeleteAddressDialog] = useState("");

  const handleClickDeleteAddress = (id) => {
    setOpenDeleteAddressDialog(id);
  };

  const handleCloseDeleteAddress = () => {
    setOpenDeleteAddressDialog("");
  };

  const handleClickUpdateAddress = (id) => {
    setOpenUpdateAddressDialog(id);
  };

  const handleCloseUpdateAddress = () => {
    setOpenUpdateAddressDialog("");
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
          <NewAddressDialog
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
                      onClick={() => handleClickUpdateAddress(address.id)}
                    >
                      Cập nhật
                    </Button>
                    <UpdateAddressDialog
                      open={openUpdateAddressDialog === address.id}
                      onClose={handleCloseUpdateAddress}
                      address={address}
                    />
                  </Box>
                  <Box>
                    <Button
                      color="black"
                      variant="contained"
                      component="label"
                      style={{ color: "white" }}
                      startIcon={<DeleteIcon />}
                      onClick={() => handleClickDeleteAddress(address.id)}
                    >
                      Xóa
                    </Button>
                    <DeleteAlertDialog
                      open={openDeleteAddressDialog === address.id}
                      onClose={handleCloseDeleteAddress}
                      id={address.id}
                    />
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
