import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import OrderTableRow from "./OrderTableRow";
import RTLProvider from "../../helpers/RTLProvider";

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

const OrdersTable = ({
  userOrders,
  setUserOrders,
  url,
  getData,
  page,
  pages,
  setPages,
  setPage,
}) => {
  const classes = useStyle();
  const columns = [
    "رقم الحركة",
    "الدقيق",
    "الخبز",
    "المبلغ",
    "الدين",
    "الرصيد",
    "التاريخ",
    "تعديل",
    "حذف",
  ];

  const handlePageChange = (e, page) => {
    let filterUrl = url;
    filterUrl = filterUrl + `&page=${page}`;
    getData(filterUrl);
  };
  return (
    <RTLProvider>
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
              {userOrders.map((order, index) => {
                return (
                  <OrderTableRow
                    userOrders={userOrders}
                    setUserOrders={setUserOrders}
                    key={index}
                    order={order}
                    index={index}
                    url={url}
                    getData={getData}
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
    </RTLProvider>
  );
};

export default OrdersTable;
