import React, { useState } from "react";
import {
  Grid,
  TextField,
  makeStyles,
  FormControl,
  Button,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
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

const Filters = ({ getData, page, url, setUrl }) => {
  const classes = useStyle();
  const [data, setData] = useState({
    from: null,
    to: null,
    orderCount: "",
  });

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };

  const reset = async (e) => {
    setData({ from: null, to: null, orderCount: "" });
    setUrl(`/admins/orders?`);
    await getData();
  };

  const search = async (e) => {
    let url = `/admins/orders?`;
    if (data.from) url = url + `&from=${data.from}`;
    if (data.to) url = url + `&to=${data.to}`;
    if (data.orderCount) url = url + `&orderCount=${data.orderCount}`;
    console.log(url);
    setUrl(url);
    url = url + `&page=${page}`;
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
  );
};

export default Filters;
