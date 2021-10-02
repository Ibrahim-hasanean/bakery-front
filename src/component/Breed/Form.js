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
import BreedConfirmForm from "./BreedConfirmForm";
import { KeyboardDatePicker } from "@material-ui/pickers";
const useStyle = makeStyles(() => ({
  form: {
    width: "100%",
  },
  inputs: {
    background: "white",
    margin: "10px 0px",
    borderRadius: "5px",
    border: "none",
    width: "40%",
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
  const [openConfirm, setOpenConfirm] = useState(false);
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

  const handleGetUser = async () => {
    getUser(formic);
  };

  const initialValues = {
    breedAmount: "",
    userId: "",
    note: undefined,
    payedAmount: "",
    date: moment(new Date()).format("YYYY-MM-DD"),
  };

  const validationSchema = yup.object().shape({
    breedAmount: yup.number().required(),
    userId: yup.string().required(),
    note: yup.string(),
    payedAmount: yup.number().default(Number(0)),
    date: yup.date(),
  });

  const formic = useFormik({
    validationSchema,
    initialValues,
    onSubmit: async (values) => {
      let data = {
        breedAmount: values.breedAmount,
        userId: values.userId,
        note: values.note,
        date: values.date,
        payedAmount: Number(values.payedAmount),
      };

      let response = await post(`/admins/orders/breed`, data);
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

  const handleChangeDate = (date) => {
    formic.setFieldValue("date", date);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const flourAmount = user?.flourAmount;
    const breedAmount = formic.getFieldProps("breedAmount").value;
    if (breedAmount > flourAmount) {
      setOpenConfirm(true);
      return;
    }
    formic.handleSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
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
            تم بيع الخبز بنجاح
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
              value={userCount}
              inputProps={{
                className: formic.errors.userId ? classes.error : "",
              }}
              type="number"
              onBlur={handleGetUser}
            />
            {formic.errors.userId ? (
              <Typography variant="subtitle2" color="secondary">
                هذا الحقل مطلوب
              </Typography>
            ) : null}
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
            label="كمية الخبز"
            {...formic.getFieldProps("breedAmount")}
            type="number"
            inputProps={{
              className:
                formic.errors.breedAmount && formic.touched.breedAmount
                  ? classes.error
                  : "",
            }}
          />
          {formic.errors.breedAmount && formic.touched.breedAmount ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="المبلغ المدفوع"
            type="number"
            {...formic.getFieldProps("payedAmount")}
          />
          {formic.errors.payedAmount && formic.touched.payedAmount ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          {/* <TextField
            className={classes.inputs}
            variant="outlined"
            label="التاريخ"
            {...formic.getFieldProps("date")}
            type="date"
          /> */}
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <KeyboardDatePicker
            {...formic.getFieldProps("date")}
            label="التاريخ"
            // openTo="year"
            // type="date"
            allowKeyboardControl={true}
            renderInput={(params) => <TextField {...params} />}
            format="d-M-yyyy"
            variant="inline"
            onChange={handleChangeDate}
          />
          {formic.errors.date && formic.touched.date ? (
            <Typography variant="subtitle2" color="secondary">
              هذا الحقل مطلوب
            </Typography>
          ) : null}
          {/* </MuiPickersUtilsProvider> */}
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="ملاحظات"
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
      <PopUp
        open={openConfirm}
        handleClose={handleCloseConfirm}
        title={`  كمية الخبز الملطوبة اكبر من كمية الخدقيق المتبقية  : ${user?.flourAmount} كيلو`}
      >
        <BreedConfirmForm formic={formic} handleClose={handleCloseConfirm} />
      </PopUp>
    </form>
  );
};

export default Form;
