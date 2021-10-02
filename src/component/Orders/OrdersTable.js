import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import { Grid, makeStyles } from "@material-ui/core";
import OrderTableRow from "./OrdersTableRow";
import RTLProvider from "../helpers/RTLProvider";

const useStyle = makeStyles(() => ({
  paper: {
    width: "90%",
    overflow: "hidden",
  },
  tableContainer: {
    maxHeight: 440,
    width: "100%",
  },
  tableHeader: {
    fontWeight: "700",
    fontSize: "15px",
    background: "orange",
    color: "white",
  },
}));

export default function OrdersTable({ orders, setOrders, pages, getOrders }) {
  const classes = useStyle();
  const columns = [
    "رقم الطلب",
    "اسم المستخدم",
    "الدقيق",
    "الخبز",
    "المبلغ",
    "الدين",
    "الرصيد",
    "التاريخ",
  ];

  const handlePageChange = async (e, page) => {
    console.log(page);
    await getOrders(`/admins/orders?page=${page}`);
  };

  return (
    <RTLProvider>
      <Grid container justifyContent="center">
        <Paper className={classes.paper}>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      className={classes.tableHeader}
                      key={index}
                      align="center"
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => {
                  return (
                    <OrderTableRow
                      orders={orders}
                      setOrders={setOrders}
                      key={index}
                      order={order}
                      index={index}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            count={pages}
            showFirstButton
            showLastButton
            onChange={handlePageChange}
          />
        </Paper>
      </Grid>
    </RTLProvider>
  );
}
