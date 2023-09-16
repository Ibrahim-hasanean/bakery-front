import React, { useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton, makeStyles } from "@material-ui/core";
import PopUp from "../../helpers/PopUp";
import DeleteOrder from "./DeleteOrder";
import EditeOrder from "./EditeOrder";
import * as moment from "moment";

const useStyle = makeStyles(() => ({
  editeIcon: {
    color: "#989813",
  },
  deleteIcon: {
    color: "#d21515",
  },
  tableCell: {
    padding: "5px",
  },
}));
const OrderTableRow = ({
  order,
  index,
  setUserOrders,
  userOrders,
  url,
  getData,
}) => {
  const [openEdite, setOpenEdite] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const classes = useStyle();

  const handleOpenDeleteOrder = () => {
    setOpenDelete(true);
  };

  const handleCloseDeleteOrder = () => {
    setOpenDelete(false);
  };

  const handleOpenEditeOrder = () => {
    setOpenEdite(true);
  };

  const handleCloseEditeOrder = () => {
    setOpenEdite(false);
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell className={classes.tableCell} align="center">
        {order.orderCount}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.flourAmount || "_"}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.breedAmount || "_"}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.payedAmount || "_"}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.debt || "_"}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.currentAccount}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {moment(new Date(order?.date).toISOString()).format("DD-MM-YYYY")}

        {/* {moment(new Date(order?.date).toLocaleDateString()).format(
          "DD-MM-YYYY"
        )} */}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <IconButton onClick={handleOpenEditeOrder}>
          <EditIcon className={classes.editeIcon} />
        </IconButton>
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        <IconButton onClick={handleOpenDeleteOrder}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </TableCell>
      <PopUp
        open={openDelete}
        handleClose={handleCloseDeleteOrder}
        title="هل تريد بالتاكيد حذف هذه الحركة"
      >
        <DeleteOrder
          userOrders={userOrders}
          order={order}
          setUserOrders={setUserOrders}
          handleClose={handleCloseDeleteOrder}
          getData={getData}
          url={url}
        />
      </PopUp>
      <PopUp
        open={openEdite}
        handleClose={handleCloseEditeOrder}
        title="تعديل الحركة"
      >
        <EditeOrder
          userOrders={userOrders}
          order={order}
          setUserOrders={setUserOrders}
          handleClose={handleCloseEditeOrder}
          getData={getData}
          url={url}
        />
      </PopUp>
    </TableRow>
  );
};

export default OrderTableRow;
