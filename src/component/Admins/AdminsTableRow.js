import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, makeStyles } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import PopUp from "../helpers/PopUp";
import EditeAdmin from "./EditeAdmin";
import DeleteAdmin from "./DeleteAdmin";
const useStyle = makeStyles(() => ({
  editeIcon: {
    color: "#989813",
  },
  tableCell: {
    padding: "2px",
  },
  checkedIcon: {
    color: "green",
  },
}));

const AdminsTableRow = ({ admins, admin, setAdmins, index }) => {
  const [openEdite, setOpenEdite] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const classes = useStyle();

  const handleCloseEdite = () => {
    setOpenEdite(false);
  };

  const handleOpenEdite = () => {
    setOpenEdite(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell className={classes.tableCell} align="center">
        {index + 1}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin?.name}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin?.phoneNumber}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin.isBigManager ? (
          <CheckCircleIcon className={classes.checkedIcon} />
        ) : (
          <CancelIcon color="secondary" />
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin.isBigManager || admin.canManageBreed ? (
          <CheckCircleIcon className={classes.checkedIcon} />
        ) : (
          <CancelIcon color="secondary" />
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin.canManageFlour || admin.isBigManager ? (
          <CheckCircleIcon className={classes.checkedIcon} />
        ) : (
          <CancelIcon color="secondary" />
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin.canManageDebts || admin.isBigManager ? (
          <CheckCircleIcon className={classes.checkedIcon} />
        ) : (
          <CancelIcon color="secondary" />
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin.canManageUsers || admin.isBigManager ? (
          <CheckCircleIcon className={classes.checkedIcon} />
        ) : (
          <CancelIcon color="secondary" />
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {admin.canManagePaid || admin.isBigManager ? (
          <CheckCircleIcon className={classes.checkedIcon} />
        ) : (
          <CancelIcon color="secondary" />
        )}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <IconButton onClick={handleOpenEdite}>
          <EditIcon className={classes.editeIcon} />
        </IconButton>
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <IconButton onClick={handleOpenDelete}>
          <DeleteIcon color="secondary" />
        </IconButton>
      </TableCell>
      <PopUp
        open={openEdite}
        handleClose={handleCloseEdite}
        title="تعديل بيانات المسؤول"
      >
        <EditeAdmin
          handleClose={handleCloseEdite}
          admin={admin}
          admins={admins}
          setAdmins={setAdmins}
        />
      </PopUp>
      <PopUp open={openDelete} handleClose={handleCloseDelete}>
        <DeleteAdmin
          handleClose={handleCloseDelete}
          admin={admin}
          admins={admins}
          setAdmins={setAdmins}
        />
      </PopUp>
    </TableRow>
  );
};

export default AdminsTableRow;
