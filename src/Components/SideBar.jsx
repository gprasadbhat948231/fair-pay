import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { MdHome } from "react-icons/md";
import { FaMoneyBillTransfer, FaUserGroup } from "react-icons/fa6";
import MenuIcon from "@mui/icons-material/Menu";

const SideBar = ({ status, setSideBar }) => {
  let Menus = [
    { name: "Home", icon: <MdHome size={"25px"} /> },
    { name: "Expenses history", icon: <FaMoneyBillTransfer size={"25px"} /> },
    { name: "Group list", icon: <FaUserGroup size={"25px"} /> },
  ];

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setSideBar(false)}
    >
      <List>
        <ListItem>
          <MenuIcon sx={{ width: "25px", height: "25px" }} />
        </ListItem>
        {Menus.map((item, index) => (
          <ListItem
            key={item.name}
            sx={{
              cursor: "pointer",
              "&:hover": { backgroundColor: "#e3e3e3" },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={status} onClose={() => setSideBar(!status)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBar;
