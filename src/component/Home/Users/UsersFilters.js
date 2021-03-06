import React, { useState } from "react";
import { Grid, TextField, makeStyles, Button } from "@material-ui/core";
import PopUp from "../../helpers/PopUp";
import AddUser from "./AddUser";
import { useAuthContext } from "../../../context/authContext";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
const useStyle = makeStyles(() => ({
  root: {
    padding: "10px",
    width: "90%",
  },
  inputs: {
    height: "15px",
    width: "120px",
    margin: "0px 5px",
  },
  margin: {
    margin: "10px 10px",
  },
}));

const UsersFilters = ({ users, setUsers, getUsers }) => {
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    userCount: "",
    account: "",
  });
  const [openAddUser, setOpenAddUser] = useState(false);
  const { admin } = useAuthContext();
  const classes = useStyle();

  const handleOpenAddUser = (e) => {
    setOpenAddUser(true);
  };

  const handleCloseAddUser = (e) => {
    setOpenAddUser(false);
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
  };

  const search = async () => {
    let url = `/admins/users?`;
    if (data.name) url = url + `&name=${data.name}`;
    if (data.userCount) url = url + `&userCount=${data.userCount}`;
    if (data.phoneNumber) url = url + `&phoneNumber=${data.phoneNumber}`;
    if (data.account) url = url + `&account=${data.account}`;
    await getUsers(url);
  };

  const reset = async () => {
    let url = `/admins/users?`;
    await getUsers(url);
    setData({ name: "", phoneNumber: "", userCount: "", account: "" });
  };

  return (
    <Grid className={classes.root} container justifyContent="space-between">
      <Grid container item xs={10} alignItems="center">
        <TextField
          value={data.userCount}
          onChange={handleChange}
          className={classes.margin}
          inputProps={{
            className: classes.inputs,
          }}
          label="?????? ????????????????"
          variant="standard"
          name="userCount"
        />
        <TextField
          value={data.name}
          onChange={handleChange}
          className={classes.margin}
          inputProps={{
            className: classes.inputs,
          }}
          label="?????? ????????????????"
          variant="standard"
          name="name"
        />
        <TextField
          value={data.phoneNumber}
          onChange={handleChange}
          className={classes.margin}
          inputProps={{
            className: classes.inputs,
          }}
          label="?????? ????????????"
          variant="standard"
          name="phoneNumber"
        />
        <Box sx={{ minWidth: 150 }} className={classes.margin}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              ?????????? ?????? ????????????
            </InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.account}
              label="?????????? ?????? ????????????"
              onChange={handleChange}
              name="account"
            >
              <MenuItem value={2}>???? ????????</MenuItem>
              <MenuItem value={1}>???????? ????????</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          className={classes.margin}
          onClick={search}
          color="primary"
          variant="contained"
        >
          ??????
        </Button>
        <Button
          className={classes.margin}
          onClick={reset}
          color="default"
          variant="contained"
        >
          ?????????? ????????????
        </Button>
      </Grid>
      <Grid container item xs={2} alignItems="center" justifyContent="flex-end">
        <Button
          disabled={!admin?.isBigManager && !admin?.canManageUsers}
          onClick={handleOpenAddUser}
          color="primary"
          variant="contained"
        >
          ?????????? ????????????
        </Button>
      </Grid>
      <PopUp
        title="?????????? ???????????? ????????"
        handleClose={handleCloseAddUser}
        open={openAddUser}
      >
        <AddUser
          handleClose={handleCloseAddUser}
          users={users}
          setUsers={setUsers}
        />
      </PopUp>
    </Grid>
  );
};

export default UsersFilters;
