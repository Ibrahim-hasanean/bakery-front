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
import { post, get } from "../../../api/genericApi";
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
  alert: {
    width: "70%",
  },
  error: {
    border: "1px solid red",
  },
}));
const AddUser = ({ users, setUsers, handleClose }) => {
  const classes = useStyle();
  const history = useHistory();
  const [newUser, setNewUser] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const initialValues = {
    name: "",
    phoneNumber: "",
    address: "",
    note: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("هذا الحقل مطلوب"),
    phoneNumber: yup
      .string()
      .required("هذا الحقل مطلوب")
      .length(10, "يجب ان يكون طول الحقل 10 ارقام"),
    address: yup.string(),
    password: yup.string().required("هذا الحقل مطلوب"),
    note: yup.string(),
  });

  const formic = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      let data = {
        phoneNumber: values.phoneNumber,
        name: values.name,
        address: values.address || undefined,
        note: values.note || undefined,
        password: values.password || undefined,
      };
      let response = await post(`/admins/users`, data);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.RESOURCE_CREATED) {
        let newUsers = [response.data.user, ...users];
        setUsers([...newUsers]);
        setNewUser(response.data.user);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          setSuccess(false);
          formic.resetForm();
          setNewUser(null);
        }, 3000);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        history.push("/login");
      } else {
        console.log(response.data.msg);
        setError(response.data.msg);
        setSuccess(false);
      }
    },
  });

  const checkUserMobile = async (e) => {
    let value = e.target.value;
    formic.handleBlur(e);
    if (value) {
      let response = await get(`/admins/users?phoneNumber=${value}`);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        let users = response.data.users;
        if (users.length > 0) {
          console.log(users);
          formic.setFieldError("phoneNumber", "رقم الجوال مستخدم من قبل");
        } else {
          formic.setFieldValue("password", value);
        }
      }
    }
  };
  return (
    <form onSubmit={formic.handleSubmit} className={classes.form}>
      <Grid container justifyContent="center">
        {error && (
          <Alert className={classes.alert} variant="outlined" severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Alert
              className={classes.alert}
              variant="outlined"
              severity="success"
            >
              تم اضافة المستخدم بنجاح
            </Alert>
            <Typography variant="h6">
              رقم المستخدم:{newUser?.userCount}
            </Typography>
          </Grid>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
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
            onBlur={checkUserMobile}
          />
          {formic.errors.phoneNumber && formic.touched.phoneNumber ? (
            <Typography variant="subtitle2" color="secondary">
              {formic.errors.phoneNumber}
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

export default AddUser;
