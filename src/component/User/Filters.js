import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  Button,
} from "@material-ui/core";

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

const Filters = ({ getData, user, setUrl, url }) => {
  const classes = useStyle();
  const [data, setData] = useState({ from: "", to: "", orderCount: "" });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const reset = async (e) => {
    setData({ from: "", to: "", orderCount: "" });
    setUrl(`/admins/users/${user._id}?`);
    await getData();
  };

  const search = async (e) => {
    let filterUrl = `/admins/users/${user._id}?`;
    if (data.from) filterUrl = filterUrl + `&from=${data.from}`;
    if (data.to) filterUrl = filterUrl + `&to=${data.to}`;
    if (data.orderCount)
      filterUrl = filterUrl + `&orderCount=${data.orderCount}`;
    setUrl(filterUrl);
    await getData(filterUrl);
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
        </FormControl>
        <FormControl className={classes.formControl}>
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
      <Grid
        container
        justifyContent="flex-end"
        alignItems="flex-end"
        item
        xs={2}
      ></Grid>
    </Grid>
  );
};

export default Filters;
