import React from "react";
import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import { deleteRequest } from "../../api/genericApi";
import { API_COMMON_STATUS } from "../../helpers/api-helpers";
const useStyle = makeStyles(() => ({
  buttons: {
    margin: "15px",
    fontWeight: "700",
  },
}));

const DeleteAdmin = ({ admin, setAdmins, admins, handleClose }) => {
  const classes = useStyle();

  const deleteAdmin = async () => {
    const response = await deleteRequest(`/admins/${admin._id}`);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      let newAdmins = admins.filter((x) => x._id !== admin._id);
      setAdmins([...newAdmins]);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center">
        <Typography variant="h6">
          هل تريد بالتاكيد حذف المسؤول "<b> {admin.name}</b>"
        </Typography>
      </Grid>
      <Button
        onClick={deleteAdmin}
        className={classes.buttons}
        variant="contained"
        color="secondary"
      >
        حذف المسؤول
      </Button>
      <Button
        className={classes.buttons}
        onClick={handleClose}
        variant="contained"
        color="default"
      >
        الغاء
      </Button>
    </Grid>
  );
};

export default DeleteAdmin;
