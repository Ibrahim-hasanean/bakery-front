import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import * as yup from "yup";
import { useFormik } from "formik";
import { post } from "../../api/genericApi";
import { API_COMMON_STATUS } from "../../helpers/api-helpers";
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
  checkBoxContainer: {
    padding: "20px 0px",
  },
}));
const AddAdmin = ({ admins, setAdmins, handleClose }) => {
  const classes = useStyle();
  const history = useHistory();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const initialValues = {
    name: "",
    phoneNumber: "",
    password: "",
    isBigManager: false,
    canManageUsers: false,
    canManageFlour: false,
    canManageBreed: false,
    canManageDebts: false,
    canManagePaid: false,
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    phoneNumber: yup.string().required(),
    password: yup.string().required(),
    isBigManager: yup.boolean().default(false),
    canManageUsers: yup.boolean().default(false),
    canManageFlour: yup.boolean().default(false),
    canManageBreed: yup.boolean().default(false),
    canManageDebts: yup.boolean().default(false),
    canManagePaid: yup.boolean().default(false),
  });

  const formic = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      let data = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        password: values.password,
        isBigManager: Boolean(values.isBigManager),
        canManageUsers: Boolean(values.canManageUsers),
        canManageFlour: Boolean(values.canManageFlour),
        canManageBreed: Boolean(values.canManageBreed),
        canManageDebts: Boolean(values.canManageDebts),
        canManagePaid: Boolean(values.canManagePaid),
      };
      console.log(data);
      let response = await post(`/admins/register`, data);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.RESOURCE_CREATED) {
        setAdmins([...admins, response.data.admin]);
        setSuccess(true);
        formic.resetForm();
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
            تم اضافة المسؤول بنجاح
          </Alert>
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
            label="اسم المسؤول"
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
            label="رقم جوال المسسؤول"
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
            label=" كلمة سر المسؤول"
            {...formic.getFieldProps("password")}
          />
          {formic.errors.password && formic.touched.password ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <Grid
            className={classes.checkBoxContainer}
            container
            justifyContent="center"
            alignItems="center"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={formic.values.isBigManager}
                  {...formic.getFieldProps("isBigManager")}
                />
              }
              label="مسؤول النظام"
            />
            {formic.errors.isBigManager && formic.touched.isBigManager ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formic.values.isBigManager || formic.values.canManageUsers
                  }
                  {...formic.getFieldProps("canManageUsers")}
                />
              }
              label="يدير المستخدمين"
            />
            {formic.errors.canManageUsers && formic.touched.canManageUsers ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formic.values.isBigManager || formic.values.canManageFlour
                  }
                  {...formic.getFieldProps("canManageFlour")}
                />
              }
              label="يدير الدقيق "
            />
            {formic.errors.canManageFlour && formic.touched.canManageFlour ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formic.values.isBigManager || formic.values.canManageBreed
                  }
                  {...formic.getFieldProps("canManageBreed")}
                />
              }
              label="يدير الخبز "
            />
            {formic.errors.canManageBreed && formic.touched.canManageBreed ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formic.values.isBigManager || formic.values.canManageDebts
                  }
                  {...formic.getFieldProps("canManageDebts")}
                />
              }
              label="يدير الدين "
            />
            {formic.errors.canManageDebts && formic.touched.canManageDebts ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    formic.values.isBigManager || formic.values.canManagePaid
                  }
                  {...formic.getFieldProps("canManagePaid")}
                />
              }
              label="يدير سند القبض "
            />
            {formic.errors.canManagePaid && formic.touched.canManagePaid ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
          </Grid>
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

export default AddAdmin;
