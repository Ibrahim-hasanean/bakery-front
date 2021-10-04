import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../context/authContext";
import Form from "../component/Paid/Form";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  root: {
    padding: "20px 0px",
  },
}));

const Paid = () => {
  const { admin } = useAuthContext();
  const history = useHistory();
  const classes = useStyle();
  useEffect(() => {
    if (admin) {
      if (!admin?.canManagePaid && !admin?.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManagePaid, admin?.isBigManager, history, admin]);
  return (
    <Grid className={classes.root} container justifyContent="center">
      <Typography variant="h4" color="textPrimary">
        سند قبض نقدي
      </Typography>
      <Form />
    </Grid>
  );
};

export default Paid;
