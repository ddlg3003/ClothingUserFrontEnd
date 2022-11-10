import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";

const SideBar = (props) => {
  return (
    <>
      <div className={props.classes.profileNav}>
        <Stack direction="column">
          <Stack direction="row" mb={5}>
            <img
              src="data:image/jpeg;base64,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"
              alt=""
              width={80}
              height={80}
              className={props.classes.image}
            />
            <Typography fontWeight="bold" ml={1} mt="20px">
              pphianh
            </Typography>
          </Stack>

          <List
            sx={{
              width: "100%",
              maxWidth: 300,
              bgcolor: "background.paper",
            }}
            component="nav"
          >
            <ListItem
              button
              onClick={() => props.handleNavSelectionChange("profile")}
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
              onClick={() => props.handleNavSelectionChange("address")}
            >
              <ListItemIcon>
                <EditLocationAltIcon />
              </ListItemIcon>
              <ListItemText primary="Địa chỉ" />
            </ListItem>
            <ListItem
              button
              onClick={() => props.handleNavSelectionChange("changePassword")}
            >
              <ListItemIcon>
                <LockIcon />
              </ListItemIcon>
              <ListItemText primary="Đổi mật khẩu" />
            </ListItem>
            <Divider />

            <ListItem
              button
              onClick={() => props.handleNavSelectionChange("favorites")}
            >
              <ListItemIcon>
                <FavoriteIcon />
              </ListItemIcon>
              <ListItemText primary="Yêu thích" />
            </ListItem>
            <Divider />
            
            <ListItem
              button
              onClick={() => props.handleNavSelectionChange("orders")}
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
