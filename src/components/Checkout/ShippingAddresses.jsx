import React from 'react';
import {
  Button,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Container } from '@mui/system';
import useStyles from './styles';
import PropTypes from 'prop-types';
import { blue } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import {
  useGetUserAddressQuery,
  useSelectDefaultAddressMutation,
} from '../../services/userApis';
import {
  SIDEBAR_STATE,
  PROFILE_QUERY_STRING,
} from '../../utils/globalVariables';

function AddressSelectionDialog(props) {
  const { onClose, selectedValue, open } = props;

  const [selectDefaultAddress] = useSelectDefaultAddressMutation();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = async (value) => {
    await selectDefaultAddress(value.id);
    onClose(value);
  };

  const { data, isFetching } = useGetUserAddressQuery();

  return (
    <Dialog fullWidth={true} maxWidth="sm" onClose={handleClose} open={open}>
      <DialogTitle>Địa chỉ của tôi</DialogTitle>
      <List>
        {isFetching ? (
          <ListItemText>
            <Typography variant="body2" color="text.secondary" fontSize={16}>
              Đang tải địa chỉ...
            </Typography>
          </ListItemText>
        ) : (
          data.map((address) => (
            <ListItem
              button
              onClick={() => handleListItemClick(address)}
              key={address}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <LocationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <Stack spacing={0}>
                <ListItemText>
                  <Typography color="black" fontSize={18}>
                    {address.name}
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={16}
                  >
                    {address.phoneNumber}
                  </Typography>
                </ListItemText>
                <ListItemText>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    fontSize={16}
                  >
                    {address.address}
                  </Typography>
                </ListItemText>
              </Stack>
            </ListItem>
          ))
        )}

        <ListItem
          autoFocus
          button
          onClick={() => {
            window.location.href = `/profile?${PROFILE_QUERY_STRING.tab}=${SIDEBAR_STATE.address}`;
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Địa chỉ của tôi" />
        </ListItem>
      </List>
    </Dialog>
  );
}

const ShippingAddresses = () => {
  const { data, isFetching } = useGetUserAddressQuery();

  const defaultAddress = data?.find((address) => address?.add_default === true);
  // console.log(defaultAddress);

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState();
  const handleClickChangeAddress = () => {
    setOpen(true);
  };

  const handleCloseChangeAddress = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <>
      <Container>
        <Box className={classes.addressBox} component={Paper} elevation={1}>
          <div>
            <LocationOnIcon fontSize="small" sx={{ color: 'black' }} />
            <Typography
              paddingTop="5px"
              marginLeft="4px"
              fontSize="23px"
              fontWeight="normal"
              align="center"
              paddingBottom="10px"
              display="inline-block"
              mr={2}
            >
              Địa chỉ nhận hàng
            </Typography>{' '}
            <span>
              <Button
                variant="outlined"
                color="black"
                onClick={handleClickChangeAddress}
              >
                Thay đổi
              </Button>
              <AddressSelectionDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleCloseChangeAddress}
              />
            </span>
          </div>
          <div>
            {isFetching ? (
              <Typography
                paddingTop="0px"
                marginLeft="4px"
                fontSize="20px"
                align="center"
                paddingBottom="0px"
                display="inline-block"
              >
                Đang tải địa chỉ...
              </Typography>
            ) : defaultAddress ? (
              <div>
                <Typography
                  paddingTop="0px"
                  marginLeft="4px"
                  fontSize="20px"
                  fontWeight="bold"
                  align="center"
                  paddingBottom="0px"
                  display="inline-block"
                >
                  {defaultAddress.name} - {defaultAddress.phoneNumber}
                </Typography>
                <div>
                  <Typography
                    paddingTop="0px"
                    marginLeft="4px"
                    fontSize="20px"
                    fontWeight="normal"
                    align="left"
                    paddingBottom="0px"
                    display="inline-block"
                    marginRight="20px"
                  >
                    {defaultAddress.address}
                  </Typography>
                </div>
              </div>
            ) : (
              <Typography
                paddingTop="0px"
                marginLeft="4px"
                fontSize="20px"
                align="center"
                paddingBottom="0px"
                display="inline-block"
                mt={2}
              >
                Bạn chưa cập nhật địa chỉ nào!
              </Typography>
            )}
          </div>
        </Box>
      </Container>
    </>
  );
};

export default ShippingAddresses;
