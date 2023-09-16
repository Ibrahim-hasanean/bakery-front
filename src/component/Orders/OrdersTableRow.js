import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import * as moment from "moment";
const useStyle = makeStyles(() => ({
  editeIcon: {
    color: "#989813",
  },
  tableCell: {
    padding: "12px",
  },
}));

const OrdersTableRow = ({ orders, order, setOrders, index }) => {
  const classes = useStyle();

  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell className={classes.tableCell} align="center">
        {order.orderCount}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order.userId?.name}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order.flourAmount}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.breedAmount}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.payedAmount}
      </TableCell>
      <TableCell className={classes.tableCell} align="center">
        {order?.debt}
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
    </TableRow>
  );
};

export default OrdersTableRow;
