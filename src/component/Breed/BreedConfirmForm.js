import { Button, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyle = makeStyles(() => ({
  buttons: {
    margin: "10px 10px",
  },
}));

const BreedConfirmForm = ({ formic, handleClose }) => {
  const classes = useStyle();

  const confirm = async () => {
    await formic.submitForm();
    handleClose();
  };

  return (
    <Grid container justifyContent="center">
      <Grid container justifyContent="center">
        <Typography variant="h6" color="textPrimary">
          هل تريد بالتاكيد بيع الخبز
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Button
          onClick={confirm}
          variant="contained"
          className={classes.buttons}
          color="primary"
        >
          نعم
        </Button>
        <Button
          onClick={handleClose}
          variant="contained"
          className={classes.buttons}
          color="default"
        >
          الغاء
        </Button>
      </Grid>
    </Grid>
  );
};

export default BreedConfirmForm;
