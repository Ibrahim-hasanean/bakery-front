import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton, makeStyles, Switch } from "@material-ui/core";
import { get } from "../../../api/genericApi";
import { useHistory } from "react-router-dom";
import { API_COMMON_STATUS } from "../../../helpers/api-helpers";
import PopUp from "../../helpers/PopUp";
import EditeUser from "./EditeUser";
import { useAuthContext } from "../../../context/authContext";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";

const useStyle = makeStyles(() => ({
  editeIcon: {
    color: "#989813",
  },
  tableCell: {
    padding: "2px",
  },
  disabled: {
    color: "gray",
  },
}));

const UsersTableRow = ({ users, user, setUsers, index }) => {
  const [openEdite, setOpenEdite] = useState(false);
  const { admin } = useAuthContext();
  const classes = useStyle();
  const history = useHistory();

  const handleCloseEdite = () => {
    setOpenEdite(false);
  };

  const handleOpenEdite = () => {
    setOpenEdite(true);
  };

  const goToUserPage = () => {
    history.push(`user/${user._id}`);
  };

  const toggleActiveUsers = async () => {
    let response = await get(`/admins/users/${user._id}/active`);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      let newUsers = [...users];
      let newUser = user;
      newUser.isActive = !user.isActive;
      let newUserIndex = newUsers.findIndex((x) => x._id === user._id);
      newUser[newUserIndex] = newUser;
      setUsers([...newUsers]);
    } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      history.push("/login");
    }
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user.account > 0 ? <RadioButtonCheckedIcon color="secondary" /> : null}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user.userCount}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.phoneNumber}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.name}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.flourAmount}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.breedAmount}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.debtAmount}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.totalPayed}
      </TableCell>
      <TableCell
        onDoubleClick={goToUserPage}
        className={classes.tableCell}
        align="center"
      >
        {user?.account}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <IconButton
          disabled={!admin?.isBigManager && !admin?.canManageUsers}
          onClick={handleOpenEdite}
        >
          <EditIcon
            className={
              !admin?.isBigManager && !admin?.canManageUsers
                ? classes.disabled
                : classes.editeIcon
            }
          />
        </IconButton>
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <Switch
          disabled={!admin?.isBigManager && !admin?.canManageUsers}
          onChange={toggleActiveUsers}
          checked={user.isActive}
        />
      </TableCell>
      <PopUp
        open={openEdite}
        handleClose={handleCloseEdite}
        title="تعديل بيانات المستخدم"
      >
        <EditeUser user={user} users={users} setUsers={setUsers} />
      </PopUp>
    </TableRow>
  );
};

export default UsersTableRow;
