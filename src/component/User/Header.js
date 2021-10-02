import React from "react";
import Boxes from "../helpers/Boxes";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyle = makeStyles(() => ({
  textContainer: {
    padding: "10px 0px",
  },
  text: {
    color: "#cc762d",
    fontWeight: "800",
  },
}));

const Header = ({ user, data, loading }) => {
  const classes = useStyle();
  const SummaryData = [
    { title: "الدقيق الكلي", value: data?.totalFlour },
    { title: "الدقيق المتبقي", value: data?.restFlour },
    { title: "الرصيد الكلي", value: data?.totalAccount },
    { title: "الخبز الكلي", value: data?.totalBreed },
    { title: "الخبز تحت الحساب", value: data?.totalDebt },
    { title: "المبلغ المدفوع", value: data?.totalPayed },
    { title: "المبلغ المتبقي", value: data?.restAccount },
  ];
  return (
    <Grid container justifyContent="center">
      <Grid
        className={classes.textContainer}
        container
        justifyContent="flex-start"
        item
        xs={11}
      >
        <Typography className={classes.text} variant="h5">
          {user?.name}
        </Typography>
      </Grid>
      <Grid container justifyContent="center">
        <Boxes
          loading={loading}
          SummaryData={SummaryData}
          style={{ background: "#cc762d" }}
        />
      </Grid>
    </Grid>
  );
};

export default Header;
