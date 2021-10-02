import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { Grid, makeStyles } from "@material-ui/core";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import { get } from "../api/genericApi";
import { useHistory } from "react-router-dom";
import AdminsTable from "../component/Admins/AdminsTable";
import Header from "../component/Admins/Header";

const useStyle = makeStyles(() => ({
  root: {
    padding: "30px",
  },
}));

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const history = useHistory();
  const classes = useStyle();
  const { admin } = useAuthContext();

  const getAdmins = async (url = "/admins?") => {
    let response = await get(url);
    console.log(response);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      setAdmins(response.data.admins);
    } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      history.push("/login");
    }
  };
  useEffect(() => {
    if (admin) {
      console.log("useeffect");
      if (!admin?.isBigManager) {
        history.push("/");
      } else {
        getAdmins();
      }
    }
  }, [admin?.isBigManager, history, admin]);

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Header admins={admins} setAdmins={setAdmins} />
      <AdminsTable admins={admins} setAdmins={setAdmins} />
    </Grid>
  );
};

export default Admins;
