import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "../context/authContext";
import { Grid, Typography } from "@material-ui/core";
import Form from "../component/Paid/Form";

const Paid = () => {
  const { admin } = useAuthContext();
  const history = useHistory();
  useEffect(() => {
    if (admin) {
      if (!admin?.canManagePaid && !admin?.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManagePaid, admin?.isBigManager, history, admin]);
  return (
    <Grid container justifyContent="center">
      <Typography variant="h4" color="textPrimary">
        سند قبض نقدي
      </Typography>
      <Form />
    </Grid>
  );
};

export default Paid;
