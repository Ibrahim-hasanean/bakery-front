import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import UsersTableRow from "./UsersTableRow";
import RTLProvider from "../../helpers/RTLProvider";
import { useRef } from "react";
import { useCallback } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyle = makeStyles(() => ({
  paper: {
    width: "90%",
    overflow: "hidden",
  },
  tableContainer: {
    height: 460,
    width: "100%",
    overflowY: "scroll",
  },
  tableHeader: {
    fontWeight: "700",
    fontSize: "15px",
    background: "orange",
    color: "white",
  },
}));

export default function UsersTable({
  users,
  setUsers,
  pages,
  getUsers,
  setPage,
  page,
  hasMore,
  setHasMore,
  loading,
}) {
  const classes = useStyle();
  const [distanceBottom, setDistanceBottom] = useState(0);

  let tableContainerRef = useRef();
  const columns = [
    "",
    "رقم المستخدم",
    "رقم جوال المستخدم",
    "اسم المستخدم",
    "كمية الدقيق المتبقية",
    "كمية الخبز",
    "الخبز على الحساب",
    "المبلغ المدفوع",
    "الرصيد",
    "تعديل",
    "تفعيل/ايقاف",
  ];

  const loadMore = useCallback(async () => {
    if (page + 1 <= pages) {
      console.log("load moreeee", page + 1, pages);
      setPage((page) => page + 1);
      getUsers(page + 1);
    }
  }, [page, pages, setPage, getUsers]);

  const scrollListener = useCallback(() => {
    let bottom =
      tableContainerRef.current.scrollHeight -
      tableContainerRef.current.clientHeight;
    // if you want to change distanceBottom every time new data is loaded
    // don't use the if statement
    if (!distanceBottom) {
      // calculate distanceBottom that works for you
      setDistanceBottom(Math.round((bottom / 100) * 20));
    }
    if (
      tableContainerRef.current.scrollTop > bottom - distanceBottom &&
      hasMore &&
      !loading
    ) {
      loadMore();
    }
  }, [hasMore, loadMore, loading, distanceBottom]);

  useLayoutEffect(() => {
    const tableRef = tableContainerRef.current;
    tableRef.addEventListener("scroll", scrollListener);
    return () => {
      tableRef.removeEventListener("scroll", scrollListener);
    };
  }, [scrollListener]);

  return (
    <RTLProvider>
      <Paper className={classes.paper}>
        <TableContainer
          ref={tableContainerRef}
          id="table-container"
          className={classes.tableContainer}
        >
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
              {users.map((user, index) => {
                return (
                  <UsersTableRow
                    users={users}
                    setUsers={setUsers}
                    key={index}
                    user={user}
                    index={index}
                  />
                );
              })}
              {loading && <CircularProgress />}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </RTLProvider>
  );
}
