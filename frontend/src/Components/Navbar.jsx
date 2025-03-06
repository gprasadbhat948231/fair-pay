import React, { useState } from "react";
import "./Navbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router";
import { IconButton, Menu, MenuItem } from "@mui/material";

const NavBar = () => {
  const [hoverElement, setHoverElement] = useState(false);

  const handleClick = (e) => {
    setHoverElement(e.currentTarget);
  };

  const handleClose = () => {
    setHoverElement(false);
  };

  return (
    <div className="navbar-main-container">
      <div className="navbar-container">
        <div className="left-side-container">
          <Link to="/">
            <div className="logo-container">
              <div>
                <img
                  src="../../public/split-wise-logo.png"
                  alt="company-logo"
                  className="logo-img"
                />
              </div>
              <div className="company-name">Fairpay</div>
            </div>
          </Link>
          <div className="menus">
            <Link to="/expenses">
              <div className="menu-options">Expenses</div>
            </Link>
            <Link to="groups">
              <div className="menu-options">Groups</div>
            </Link>
            <Link to="amount-settle">
              <div className="menu-options">Settle</div>
            </Link>
          </div>
        </div>
        <div className="nav-profile-container">
          <IconButton onClick={handleClick}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={hoverElement}
            open={Boolean(hoverElement)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>My Profile</MenuItem>
            <MenuItem>Change Password</MenuItem>
            <MenuItem><Link to='/registration'>Logout</Link></MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
