import React, { useEffect } from "react";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router";
import Form from "../component/Flour/Form";
import { Grid, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  root: {
    padding: "20px 0px",
  },
}));

const Flour = () => {
  const { admin } = useAuthContext();
  const history = useHistory();
  const classes = useStyle();
  useEffect(() => {
    if (admin) {
      if (!admin?.canManageFlour && !admin?.isBigManager) {
        history.push("/");
      }
    }
  }, [admin?.canManageFlour, admin?.isBigManager, history, admin]);
  return (
    <Grid className={classes.root} container justifyContent="center">
      <Typography variant="h4" color="textPrimary">
        استلام دقيق
      </Typography>
      <Form />
    </Grid>
  );
};

export default Flour;
