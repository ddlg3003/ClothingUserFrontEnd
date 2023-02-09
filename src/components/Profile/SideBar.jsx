import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { SIDEBAR_STATE } from '../../utils/globalVariables';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ReceiptIcon from '@mui/icons-material/Receipt';
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import React from 'react';

const SideBar = (props) => {
  return (
    <>
      <div className={props.classes.profileNav}>
        <Stack direction="column">
          <Stack direction="row" mb={5}>
            <img
              alt=""
              src={
                props.userInfo?.avatar
                  ? props.userInfo?.avatar
                  : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
              }
              width={80}
              height={80}
              className={props.classes.image}
            />
            <Typography fontWeight="bold" ml={1} mt="20px">
              {props.userInfo?.username}
            </Typography>
          </Stack>

          <List
            sx={{
              width: '100%',
              maxWidth: 300,
              bgcolor: 'background.paper',
            }}
            component="nav"
          >
            <ListItem
              button
              onClick={() =>
                props.handleNavSelectionChange(SIDEBAR_STATE.profile)
              }
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Hồ sơ" />
            </ListItem>
            <Divider />
            <ListItem
              button
              divider
              onClick={() =>
                props.handleNavSelectionChange(SIDEBAR_STATE.address)
              }
            >
              <ListItemIcon>
                <EditLocationAltIcon />
              </ListItemIcon>
              <ListItemText primary="Địa chỉ" />
            </ListItem>
            <ListItem
              button
              onClick={() =>
                props.handleNavSelectionChange(SIDEBAR_STATE.password)
              }
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Đổi mật khẩu" />
            </ListItem>
            <Divider />

            <ListItem
              button
              onClick={() =>
                props.handleNavSelectionChange(SIDEBAR_STATE.favorites)
              }
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Yêu thích" />
            </ListItem>
            <Divider />

            <ListItem
              button
              onClick={() =>
                props.handleNavSelectionChange(SIDEBAR_STATE.orders)
              }
            >
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Đơn mua" />
            </ListItem>
          </List>
        </Stack>
      </div>
    </>
  );
};

export default SideBar;
