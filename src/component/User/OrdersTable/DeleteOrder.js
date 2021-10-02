import React from "react";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { deleteRequest } from "../../../api/genericApi";
import { API_COMMON_STATUS } from "../../../helpers/api-helpers";

const useStyle = makeStyles(() => ({
  deleteButton: {
    background: "red",
    color: "white",
    "&:hover": {
      background: "red",
    },
  },
  buttons: {
    margin: "0px 10px",
  },
}));

const DeleteOrder = ({
  order,
  userOrders,
  setUserOrders,
  handleClose,
  url,
  getData,
}) => {
  const classes = useStyle();

  const deleteOrder = async () => {
    let response = await deleteRequest(`/admins/orders/${order._id}`);
    console.log(response);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      //   let newOrders = userOrders.filter((x) => x._id !== order._id);
      //   setUserOrders([...newOrders]);
      await getData(url);
      handleClose();
    }
  };
  return (
    <Grid container justifyContent="center">
      <Button
        className={`${classes.buttons} ${classes.deleteButton}`}
        variant="contained"
        onClick={deleteOrder}
      >
        حذف
      </Button>
      <Button
        onClick={handleClose}
        className={classes.buttons}
        variant="contained"
        color="default"
      >
        الغاء
      </Button>
    </Grid>
  );
};

export default DeleteOrder;
