import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { deleteRequest } from "../../api/genericApi";
import { API_COMMON_STATUS } from "../../helpers/api-helpers";
import { useHistory } from "react-router-dom";
const useStyle = makeStyles(() => ({
  button: {
    margin: "10px",
  },
}));

const DeleteUser = ({ user, handleClose }) => {
  const classes = useStyle();
  const history = useHistory();
  const deleteUser = async () => {
    let response = await deleteRequest(`/admins/users/${user._id}`);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      history.push("/");
    }
  };
  return (
    <Grid container justifyContent="center">
      <Typography variant="h6">
        هل تريد بالتاكيد حذف المستخدم "<b>{user.name}</b>" و حساباته بشكل نهائي
      </Typography>
      <Grid container justifyContent="center">
        <Button
          onClick={deleteUser}
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          نعم
        </Button>
        <Button
          onClick={handleClose}
          className={classes.button}
          variant="contained"
          color="default"
        >
          الغاء
        </Button>
      </Grid>
    </Grid>
  );
};

export default DeleteUser;
