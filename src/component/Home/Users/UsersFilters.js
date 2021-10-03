import React, { useState } from "react";
import { Grid, TextField, makeStyles, Button } from "@material-ui/core";
import PopUp from "../../helpers/PopUp";
import AddUser from "./AddUser";
import { useAuthContext } from "../../../context/authContext";
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
    await getUsers(url);
  };

  const reset = async () => {
    let url = `/admins/users?`;
    await getUsers(url);
    setData({ name: "", phoneNumber: "", userCount: "" });
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
          label="رقم المستخدم"
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
          label="اسم المستخدم"
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
          label="رقم الجوال"
          variant="standard"
          name="phoneNumber"
        />
        <Button
          className={classes.margin}
          onClick={search}
          color="primary"
          variant="contained"
        >
          بحث
        </Button>
        <Button
          className={classes.margin}
          onClick={reset}
          color="default"
          variant="contained"
        >
          تفريغ الحقول
        </Button>
      </Grid>
      <Grid container item xs={2} alignItems="center" justifyContent="flex-end">
        <Button
          disabled={!admin?.isBigManager && !admin?.canManageUsers}
          onClick={handleOpenAddUser}
          color="primary"
          variant="contained"
        >
          اضافة مستخدم
        </Button>
      </Grid>
      <PopUp
        title="اضافة مستخدم جديد"
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
