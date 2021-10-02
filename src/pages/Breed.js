import React, { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import Form from "../component/Breed/Form";

const Breed = () => {
  const { admin } = useAuthContext();
  const history = useHistory();
  useEffect(() => {
    if (admin) {
      if (!admin.canManageBreed && !admin.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManageBreed, admin?.isBigManager, history, admin]);
  return (
    <Grid container justifyContent="center">
      <Typography variant="h4" color="textPrimary">
        بيع خبز
      </Typography>
      <Form />
    </Grid>
  );
};

export default Breed;
