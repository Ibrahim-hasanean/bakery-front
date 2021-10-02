import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import logo from "../asserts/minimal-news-app.png";
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "../api/auth";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import { useAuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
const useStyle = makeStyles(() => ({
  loginContainer: {
    flex: 1,
    background: "orange",
  },
  form: {
    width: "100%",
  },
  header: {
    paddingTop: "10px",
  },
  logo: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
  },
  inputs: {
    background: "white",
    margin: "10px 0px",
    borderRadius: "5px",
    border: "none",
    width: "30%",
  },
}));

const Login = () => {
  const classes = useStyle();
  const history = useHistory();
  const [error, setError] = useState();
  const { setAdmin, setIsAuth } = useAuthContext();
  const initialValues = {
    phoneNumber: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    phoneNumber: yup.string().required(),
    password: yup.string().required(),
  });

  const formic = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      let data = {
        phoneNumber: values.phoneNumber,
        password: values.password,
      };
      let response = await login(data);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        let { admin, token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("isAuthenticated", true);
        setAdmin(admin);
        setIsAuth(true);
        history.push("/");
      } else {
        console.log(response.data.msg);
        setError(response.data.msg);
      }
    },
  });

  return (
    <Grid container className={classes.loginContainer}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        className={classes.header}
      >
        <img src={logo} alt="logo" className={classes.logo} />
        <Typography variant="h4">مخبز المدينة</Typography>
      </Grid>
      <form onSubmit={formic.handleSubmit} className={classes.form}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <TextField
            className={classes.inputs}
            variant="outlined"
            placeholder="رقم المستخدم"
            {...formic.getFieldProps("phoneNumber")}
          />
          <TextField
            className={classes.inputs}
            variant="outlined"
            placeholder="كلمة المرور"
            type="password"
            {...formic.getFieldProps("password")}
          />
          <Button type="submit" variant="contained" color="primary">
            تسجيل الدخول
          </Button>
        </Grid>
      </form>
      <Grid container justifyContent="flex-end" alignItems="center">
        <Typography variant="body1">www.smartsoft.ps</Typography>
      </Grid>
    </Grid>
  );
};

export default Login;
