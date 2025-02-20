import React, {useState} from "react";
import { Button, Icon, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SideBar from "./SideBar";

const NavBar = () => {
    const [sideBar, setSideBar] = useState(false);
  return (
    <div>
      <div>
        <IconButton onClick={()=> setSideBar(!sideBar)}>
          <MenuIcon />
        </IconButton>
      </div>
      {
        sideBar && <SideBar status={sideBar} setSideBar={setSideBar} />
      }
    </div>
  );
};

export default NavBar;
