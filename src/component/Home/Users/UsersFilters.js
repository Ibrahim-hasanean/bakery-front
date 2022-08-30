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

const UsersFilters = ({
  data,
  setData,
  users,
  setUsers,
  getUsers,
  setPage,
}) => {
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

  const reset = async () => {
    let url = `/admins/users?`;
    setData({ name: "", phoneNumber: "", userCount: "", account: "" });
    setPage(1);
    await getUsers(1, true, false);
  };

  const search = () => {
    setPage(1);
    getUsers(1, false, false);
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
        <Box sx={{ minWidth: 150 }} className={classes.margin}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              تصنيف حسب الرصيد
            </InputLabel>
            <Select
              // labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data.account}
              label="تصنيف حسب الرصيد"
              onChange={handleChange}
              name="account"
            >
              <MenuItem value={2}>له رصيد</MenuItem>
              <MenuItem value={1}>عليه رصيد</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          className={classes.margin}
          onClick={() => search()}
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
