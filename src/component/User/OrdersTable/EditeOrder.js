import React, { useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { patch } from "../../../api/genericApi";
import { API_COMMON_STATUS } from "../../../helpers/api-helpers";
import * as yup from "yup";
import { useFormik } from "formik";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import * as moment from "moment";
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
    fontSize: "14px",
    fontWeight: "700",
  },
  editeButton: {
    background: "#989813",
    color: "white",
    "&:hover": {
      background: "#989813",
    },
  },
}));

const EditeOrder = ({
  order,
  userOrders,
  setUserOrders,
  handleClose,
  url,
  getData,
}) => {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const classes = useStyle();
  const history = useHistory();
  const initialValues = {
    breedAmount: order.breedAmount,
    flourAmount: order.flourAmount,
    debt: order.debt,
    payedAmount: order.payedAmount,
    date: moment(new Date(order.date)).format("YYYY-MM-DD"),
  };

  const schema = yup.object().shape({
    breedAmount: yup.number(),
    flourAmount: yup.number(),
    debt: yup.number(),
    payedAmount: yup.number(),
    date: yup.date(),
  });

  const formic = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      let data = {
        breedAmount: values.breedAmount,
        flourAmount: values.flourAmount,
        debt: values.debt,
        payedAmount: values.payedAmount,
        date: values.date,
      };
      console.log(data);
      let response = await patch(`/admins/orders/${order._id}`, data);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        await getData(url);
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
    <form className={classes.form} onSubmit={formic.handleSubmit}>
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
            تم تعديل الحركة بنجاح
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
            label="كمية الدقيق"
            {...formic.getFieldProps("flourAmount")}
          />
          {formic.touched.flourAmount && formic.errors.flourAmount ? (
            <Typography color="secondary" variant="body2">
              {formic.errors.flourAmount}
            </Typography>
          ) : null}
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="كمية الخبز"
            {...formic.getFieldProps("breedAmount")}
          />

          <TextField
            className={classes.inputs}
            variant="outlined"
            label="المبلغ المدفوع"
            {...formic.getFieldProps("payedAmount")}
          />
          <TextField
            className={classes.inputs}
            variant="outlined"
            label="المبلغ المدين"
            {...formic.getFieldProps("debt")}
          />
        </Grid>
        <TextField
          className={classes.inputs}
          variant="outlined"
          label="التاريخ"
          {...formic.getFieldProps("date")}
          type="date"
        />
        {formic.errors.date && formic.touched.date ? (
          <Typography variant="subtitle2" color="secondary">
            هذا الحقل مطلوب
          </Typography>
        ) : null}
        <Grid container justifyContent="center">
          <Button
            className={`${classes.buttons} ${classes.editeButton}`}
            variant="contained"
            type="submit"
          >
            تعديل
          </Button>
          <Button
            onClick={handleClose}
            className={classes.buttons}
            variant="contained"
            color="default"
          >
            الغاء
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditeOrder;
