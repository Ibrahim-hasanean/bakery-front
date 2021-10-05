import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  Button,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import PopUp from "../helpers/PopUp";
import DeleteUser from "./DeleteUser";

const useStyle = makeStyles(() => ({
  root: {
    padding: "20px 0px",
  },
  margin: {
    margin: "0px 10px",
  },
  formControl: {
    display: "flex",
    displayDirection: "column",
    alignItems: "flex-start",
    margin: "0px 10px",
  },
  label: {
    color: "black",
    fontSize: "14px",
  },
  inputs: {
    width: "150px",
  },
}));

const Filters = ({ page, getData, user, setUrl, url, setPage }) => {
  const classes = useStyle();
  const [data, setData] = useState({ from: null, to: null, orderCount: "" });
  const [open, setOpen] = useState();
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const reset = async (e) => {
    setData({ from: null, to: null, orderCount: "" });
    setUrl(`/admins/users/${user._id}?`);
    await getData(`/admins/users/${user._id}?page=${page}`);
    setPage(1);
  };

  const search = async (e) => {
    let filterUrl = `/admins/users/${user._id}?`;
    if (data.from) filterUrl = filterUrl + `&from=${data.from}`;
    if (data.to) filterUrl = filterUrl + `&to=${data.to}`;
    if (data.orderCount)
      filterUrl = filterUrl + `&orderCount=${data.orderCount}`;
    setUrl(filterUrl);
    filterUrl = filterUrl + `&page${page}`;
    await getData(filterUrl);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      className={classes.root}
      item
      xs={11}
    >
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-end"
        item
        xs={10}
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
          />
        </FormControl>

        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            onChange={(date) => {
              setData({ ...data, from: date });
            }}
            label="من تاريخ"
            allowKeyboardControl={true}
            renderInput={(params) => <TextField {...params} />}
            format="dd-MM-yyyy"
            variant="inline"
            name="from"
            value={data.from}
            invalidDateMessage="التاريخ المدخل غير صحيح"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <KeyboardDatePicker
            onChange={(date) => {
              setData({ ...data, to: date });
            }}
            label="الى تاريخ"
            allowKeyboardControl={true}
            renderInput={(params) => <TextField {...params} />}
            format="dd-MM-yyyy"
            variant="inline"
            value={data.to}
            invalidDateMessage="التاريخ المدخل غير صحيح"
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
      <Grid
        container
        justifyContent="flex-end"
        alignItems="flex-end"
        item
        xs={2}
      >
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="secondary"
        >
          حذف المستخدم بشكل نهائي
        </Button>
      </Grid>
      <PopUp open={open} handleClose={handleClose}>
        <DeleteUser handleClose={handleClose} user={user} />
      </PopUp>
    </Grid>
  );
};

export default Filters;
