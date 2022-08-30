import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { patch } from "../../../api/genericApi";
import { API_COMMON_STATUS } from "../../../helpers/api-helpers";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyle = makeStyles(() => ({
  form: {
    width: "100%",
  },
  inputs: {
    background: "white",
    margin: "10px 0px",
    borderRadius: "5px",
    border: "none",
    width: "60%",
  },
  buttons: {
    width: "30%",
    margin: "0px 10px",
  },
  error: {
    border: "1px solid red",
  },
}));
const EditeUser = ({ user, users, setUsers, handleClose }) => {
  const classes = useStyle();
  const history = useHistory();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const initialValues = {
    name: user.name || "",
    phoneNumber: user.phoneNumber || "",
    address: user.address || "",
    password: user.password || "",
    note: user.note || "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
    address: yup.string(),
    password: yup.string().required(),
    note: yup.string(),
  });

  const formic = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      let data = {
        phoneNumber: values.phoneNumber,
        name: values.name,
        address: values.address,
        note: values.note,
        password: values.password,
      };
      let response = await patch(`/admins/users/${user._id}`, data);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        let newUsers = [...users];
        let newUser = response.data.user;
        let newUserIndex = newUsers.findIndex((x) => x._id === user._id);
        newUsers[newUserIndex] = newUser;
        setUsers([...newUsers]);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        history.push("/login");
      } else {
        console.log(response.data.msg);
        setError(response.data.msg);
      }
    },
  });
  return (
    <form onSubmit={formic.handleSubmit} className={classes.form}>
      <Grid container justifyContent="center">
        {error && (
          <Alert className={classes.alert} variant="outlined" severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert
            className={classes.alert}
            variant="outlined"
            severity="success"
          >
            تم تعديل المستخدم بنجاح
          </Alert>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Typography variant="h6">رقم المستخدم:{user.userCount}</Typography>
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="اسم المستخدم"
            {...formic.getFieldProps("name")}
            inputProps={{
              className:
                formic.errors.name && formic.touched.name ? classes.error : "",
            }}
          />
          {formic.errors.name && formic.touched.name ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            inputProps={{
              className:
                formic.errors.phoneNumber && formic.touched.phoneNumber
                  ? classes.error
                  : "",
            }}
            variant="outlined"
            label="رقم جوال المستخدم"
            {...formic.getFieldProps("phoneNumber")}
          />
          {formic.errors.phoneNumber && formic.touched.phoneNumber ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            inputProps={{
              className:
                formic.errors.password && formic.touched.password
                  ? classes.error
                  : "",
            }}
            variant="outlined"
            label=" كلمة سر المستخدم"
            {...formic.getFieldProps("password")}
          />
          {formic.errors.password && formic.touched.password ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            inputProps={{
              className:
                formic.errors.address && formic.touched.address
                  ? classes.error
                  : "",
            }}
            variant="outlined"
            label="عنوان المستخدم"
            {...formic.getFieldProps("address")}
          />
          {formic.errors.address && formic.touched.address ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            inputProps={{
              className:
                formic.errors.note && formic.touched.note ? classes.error : "",
            }}
            variant="outlined"
            label="ملاحظات "
            {...formic.getFieldProps("note")}
          />
          {formic.errors.note && formic.touched.note ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <Grid container justifyContent="center">
            <Button
              className={classes.buttons}
              type="submit"
              variant="contained"
              color="primary"
            >
              حفظ
            </Button>
            <Button
              className={classes.buttons}
              onClick={handleClose}
              variant="contained"
              color="default"
            >
              الغاء
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditeUser;
