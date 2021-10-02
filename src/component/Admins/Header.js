import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import PopUp from "../helpers/PopUp";
import AddAdmin from "./AddAdmin";

const Header = ({ admins, setAdmins }) => {
  const [openAdd, setOpenAdd] = useState(false);

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handlecloseAdd = () => {
    setOpenAdd(false);
  };

  return (
    <Grid item xs={11} container justifyContent="space-between">
      <Typography color="textPrimary" variant="h4">
        ادارة المسؤولين
      </Typography>
      <Button onClick={handleOpenAdd} variant="contained" color="primary">
        اضافة مسؤول
      </Button>
      <PopUp
        open={openAdd}
        handleClose={handlecloseAdd}
        title="اضافة مسؤول جديد"
      >
        <AddAdmin
          admins={admins}
          handleClose={handlecloseAdd}
          setAdmins={setAdmins}
        />
      </PopUp>
    </Grid>
  );
};

export default Header;
