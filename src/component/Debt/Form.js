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
import { post } from "../../api/genericApi";
import { API_COMMON_STATUS } from "../../helpers/api-helpers";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import useFormHooks from "../../custommHooks/useFormHooks";
import PopUp from "../helpers/PopUp";
import UserSearch from "../helpers/UserSearch";
import * as moment from "moment";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyle = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  inputs: {
    background: "white",
    margin: "10px 0px",
    borderRadius: "5px",
    border: "none",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
    },
  },
  buttons: {
    width: "20%",
    margin: "0px 10px",
  },
  alert: {
    width: "30%",
  },
  userName: {
    color: "black",
    fontWeight: "700",
  },
  userCounterContainer: {
    width: "30%",
  },
  error: {
    border: "1px solid red",
  },
}));

const Form = () => {
  const classes = useStyle();
  const history = useHistory();
  // const [userCount, setUserCount] = useState("");
  // const [user, setUser] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const {
    user,
    userCount,
    handleUserDataChange,
    getUser,
    setUser,
    setUserCount,
    openSearch,
    handleCloseSearch,
    handleOpenSearch,
    setUserData,
  } = useFormHooks();

  // const handleUserDataChange = (e) => {
  //   let value = e.target.value;
  //   if (value) {
  //     setUserCount(value);
  //     return;
  //   }
  //   setUserCount(null);
  //   setUser(null);
  //   formic.setFieldValue("userId", undefined);
  // };

  // const getUser = async () => {
  //   if (userCount) {
  //     const response = await get(`/admins/users?userCount=${userCount}`);
  //     console.log(response);
  //     if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
  //       let user = response.data.users[0];
  //       if (user) {
  //         setUser(user);
  //         formic.setFieldValue("userId", user._id);
  //       }
  //     }
  //   } else {
  //     setUser(null);
  //   }
  // };

  const handleGetUser = async () => {
    getUser(formic);
  };

  const handleChangeDate = (date) => {
    formic.setFieldValue("date", date);
  };

  const initialValues = {
    debt: "",
    userId: "",
    note: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
  };

  const validationSchema = yup.object().shape({
    debt: yup.number().required(),
    userId: yup.string().required(),
    note: yup.string(),
    date: yup.date(),
  });

  const formic = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      let data = {
        debt: values.debt,
        userId: values.userId,
        note: values.note || undefined,
        date: values.date,
      };
      console.log(data);
      let response = await post(`/admins/orders/debt`, data);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.RESOURCE_CREATED) {
        formic.resetForm();
        setUser("");
        setUserCount("");
        setSuccess(true);
        setError(false);
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
        setSuccess(false);
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
            تم اضافة الدين بنجاح
          </Alert>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid
            className={classes.userCounterContainer}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              onChange={handleUserDataChange}
              className={classes.inputs}
              variant="outlined"
              label="رقم المستخدم"
              name="userCount"
              type="number"
              value={userCount}
              inputProps={{
                className: formic.errors.userId ? classes.error : "",
              }}
              onBlur={handleGetUser}
            />
            <Button
              onClick={handleOpenSearch}
              color="primary"
              variant="contained"
            >
              بحث عن المستخدم
            </Button>
          </Grid>
          <TextField
            className={classes.inputs}
            variant="outlined"
            placeholder="اسم المستخدم"
            name="userName"
            disabled
            value={user ? user.name : ""}
            inputProps={{
              className: classes.userName,
            }}
          />
          <TextField
            className={classes.inputs}
            variant="outlined"
            type="number"
            label="مبلغ الدين"
            {...formic.getFieldProps("debt")}
            inputProps={{
              className:
                formic.errors.debt && formic.touched.debt ? classes.error : "",
            }}
          />
          {formic.errors.debt && formic.touched.debt ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <KeyboardDatePicker
            inputVariant="outlined"
            className={classes.inputs}
            {...formic.getFieldProps("date")}
            label="التاريخ"
            // openTo="year"
            // type="date"
            allowKeyboardControl={true}
            renderInput={(params) => <TextField {...params} />}
            format="dd-MM-yyyy"
            variant="inline"
            onChange={handleChangeDate}
            invalidDateMessage="التاريخ المدخل غير صحيح"
          />
          {formic.errors.date && formic.touched.date ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="ملاحظات"
            {...formic.getFieldProps("note")}
            inputProps={{
              className:
                formic.errors.note && formic.touched.note ? classes.error : "",
            }}
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
          </Grid>
        </Grid>
      </Grid>
      <PopUp
        open={openSearch}
        handleClose={handleCloseSearch}
        title="بحث عن مستخدم"
      >
        <UserSearch
          formic={formic}
          setUserData={setUserData}
          handleClose={handleCloseSearch}
        />
      </PopUp>
    </form>
  );
};

export default Form;
