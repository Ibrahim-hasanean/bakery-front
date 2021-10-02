import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { Grid, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  dialog: {
    padding: "15px",
  },
}));

const PopUp = ({ title, open, handleClose, children }) => {
  const classes = useStyle();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <Grid className={classes.dialog} container justifyContent="center">
        <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
        {children}
      </Grid>
    </Dialog>
  );
};

export default PopUp;
