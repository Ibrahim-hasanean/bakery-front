import React, { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import Form from "../component/Flour/Form";

const Flour = () => {
  const { admin } = useAuthContext();
  const history = useHistory();
  useEffect(() => {
    console.log("useeffect");
    if (admin) {
      if (!admin?.canManageFlour && !admin?.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManageFlour, admin?.isBigManager, history, admin]);
  return (
    <Grid container justifyContent="center">
      <Typography variant="h4" color="textPrimary">
        استلام دقيق
      </Typography>
      <Form />
    </Grid>
  );
};

export default Flour;
