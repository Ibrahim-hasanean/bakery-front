import React, { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import Form from "../component/Breed/Form";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  title: {
    padding: "20px 0px",
  },
}));

const Breed = () => {
  const { admin } = useAuthContext();
  const history = useHistory();
  const classes = useStyle();
  useEffect(() => {
    if (admin) {
      if (!admin.canManageBreed && !admin.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManageBreed, admin?.isBigManager, history, admin]);
  return (
    <Grid container justifyContent="center">
      <Typography className={classes.title} variant="h4" color="textPrimary">
        بيع خبز
      </Typography>
      <Form />
    </Grid>
  );
};

export default Breed;
