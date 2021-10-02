import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  Grid,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyle = makeStyles(() => ({
  nav: {
    background: "orange",
  },
  link: {
    textDecoration: "none",
    color: "white",
    margin: "0px 20px",
    padding: "10px",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
  },
}));

const NavBar = () => {
  const classes = useStyle();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(false);
  const [open, setOpen] = useState(false);
  const { admin, isAuth, setIsAuth } = useAuthContext();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuth(false);
    history.push("/login");
    setAnchorEl(null);
    setOpen(false);
  };

  // const open = Boolean(anchorEl);
  const handleOpenMenue = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return isAuth ? (
    <AppBar className={classes.nav} position="static">
      <Toolbar>
        <Grid container alignItems="stretch" justifyContent="space-between">
          <Grid
            container
            justifyContent="flex-start"
            alignItems="stretch"
            item
            xs={10}
          >
            <NavLink
              activeStyle={{
                background: "#dca237",
              }}
              className={classes.link}
              exact
              to="/"
            >
              <Typography variant="body1">الصفحة الرئيسية</Typography>
            </NavLink>
            {admin?.isBigManager || admin?.canManageFlour ? (
              <NavLink
                activeStyle={{
                  background: "#dca237",
                }}
                className={classes.link}
                to="/flour"
                // {admin?.isBigManager || admin?.canManageFlour}
              >
                <Typography variant="body1">استلام دقيق</Typography>
              </NavLink>
            ) : null}
            {admin?.isBigManager || admin?.canManageBreed ? (
              <NavLink
                activeStyle={{
                  background: "#dca237",
                }}
                className={classes.link}
                to="/breed"
              >
                <Typography variant="body1">بيع خبز</Typography>
              </NavLink>
            ) : null}

            {admin?.isBigManager || admin?.canManageDebts ? (
              <NavLink
                activeStyle={{
                  background: "#dca237",
                }}
                className={classes.link}
                to="/debt"
              >
                <Typography variant="body1">بيع خبز على الحساب</Typography>
              </NavLink>
            ) : null}
            {admin?.isBigManager || admin?.canManagePaid ? (
              <NavLink
                activeStyle={{
                  background: "#dca237",
                }}
                className={classes.link}
                to="/payed"
              >
                <Typography variant="body1">سند قبض نقدي</Typography>
              </NavLink>
            ) : null}
            <NavLink
              activeStyle={{
                background: "#dca237",
              }}
              className={classes.link}
              to="/orders"
            >
              <Typography variant="body1">الحركات</Typography>
            </NavLink>
            {admin?.isBigManager ? (
              <NavLink
                activeStyle={{
                  background: "#dca237",
                }}
                className={classes.link}
                to="/admins"
              >
                <Typography variant="body1">المسؤولين</Typography>
              </NavLink>
            ) : null}
          </Grid>
          <IconButton onClick={handleOpenMenue}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>
              <Typography color="inherit"> الاسم : {admin?.name}</Typography>
            </MenuItem>
            <MenuItem>
              <Typography color="inherit">
                رقم الجوال : {admin?.phoneNumber}
              </Typography>
            </MenuItem>
            <MenuItem>
              <Button
                className={classes.button}
                onClick={logout}
                color="secondary"
              >
                تسجيل الخروج
              </Button>
            </MenuItem>
          </Menu>
        </Grid>
      </Toolbar>
    </AppBar>
  ) : (
    <div></div>
  );
};

export default NavBar;
