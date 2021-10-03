import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  Button,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { useFormik } from "formik";
import * as yup from "yup";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "20px 0px",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
  },
  margin: {
    margin: "10px 10px",
  },
  formControl: {
    display: "flex",
    displayDirection: "column",
    alignItems: "flex-start",
    margin: "10px 10px",
  },
  label: {
    color: "black",
    fontSize: "14px",
  },
  inputs: {
    width: "150px",
  },
}));

const Filters = ({ getData }) => {
  const classes = useStyle();
  const [data, setData] = useState({
    from: "",
    to: "",
    orderCount: "",
  });

  // const initialValues = {
  //   from: "",
  //   to: "",
  //   orderCount: "",
  // };
  // const schema = yup.object().shape({
  //   from: yup.date(),
  //   to: yup.date(),
  //   orderCount: yup.number(),
  // });

  // const formic = useFormik({
  //   initialValues,
  //   validationSchema: schema,
  //   onSubmit: async ({ values }) => {
  //     let url = `/admins/orders?`;
  //     if (values.from) url = url + `&from=${values.from}`;
  //     if (values.to) url = url + `&to=${values.to}`;
  //     if (values.orderCount) url = url + `&orderCount=${values.orderCount}`;
  //     await getData(url);
  //   },
  // });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const reset = async (e) => {
    setData({ from: "", to: "", orderCount: "" });
    // formic.resetForm();
    await getData();
  };

  const search = async (e) => {
    let url = `/admins/orders?`;
    if (data.from) url = url + `&from=${data.from}`;
    if (data.to) url = url + `&to=${data.to}`;
    if (data.orderCount) url = url + `&orderCount=${data.orderCount}`;
    await getData(url);
  };

  return (
    <Grid
      container
      justifyContent="flex-start"
      alignItems="flex-end"
      className={classes.root}
      item
      xs={11}
    >
      <FormControl className={classes.formControl}>
        <TextField
          value={data.orderCount}
          onChange={handleChange}
          id="from"
          variant="standard"
          label="رقم الحركة"
          name="orderCount"
          className={classes.inputs}
          // {...formic.getFieldProps("orderCount")}
        />
      </FormControl>

      <FormControl className={classes.formControl}>
        <label className={classes.label} htmlFor="from">
          من تاريخ
        </label>
        <TextField
          value={data.from}
          onChange={handleChange}
          id="from"
          type="date"
          name="from"
        />
        {/* <KeyboardDatePicker
          label="من تاريخ"
          allowKeyboardControl={true}
          renderInput={(params) => <TextField {...params} />}
          format="dd-MM-yyyy"
          variant="inline"
          // value={data.from}
          invalidDateMessage="التاريخ المدخل غير صحيح"
          {...formic.getFieldProps("from")}
        /> */}
      </FormControl>
      <FormControl className={classes.formControl}>
        {/* <KeyboardDatePicker
          label="الى تاريخ"
          allowKeyboardControl={true}
          renderInput={(params) => <TextField {...params} />}
          format="dd-MM-yyyy"
          variant="inline"
          // value={data.from}
          invalidDateMessage="التاريخ المدخل غير صحيح"
          {...formic.getFieldProps("to")}
        /> */}
        <label className={classes.label} htmlFor="to">
          الى تاريخ
        </label>
        <TextField
          value={data.to}
          onChange={handleChange}
          id="to"
          type="date"
          name="to"
        />
      </FormControl>
      <Button
        onClick={search}
        className={classes.margin}
        variant="contained"
        color="primary"
      >
        بحث
      </Button>
      <Button
        onClick={reset}
        className={classes.margin}
        variant="contained"
        color="default"
      >
        تفريغ الحقول
      </Button>
    </Grid>
  );
};

export default Filters;
