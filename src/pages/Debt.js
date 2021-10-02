import React, { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import Form from "../component/Debt/Form";
const Debt = () => {
  const { admin } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    console.log("useeffect");
    if (admin) {
      if (!admin?.canManageDebts && !admin?.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManageDebts, admin?.isBigManager, history, admin]);
  return (
    <Grid container justifyContent="center">
      <Typography variant="h4" color="textPrimary">
        بيع خبز على الحساب
      </Typography>
      <Form />
    </Grid>
  );
};

export default Debt;
