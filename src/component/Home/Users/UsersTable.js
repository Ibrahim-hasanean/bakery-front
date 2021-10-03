import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Pagination from "@material-ui/lab/Pagination";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import UsersTableRow from "./UsersTableRow";
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

export default function UsersTable({ users, setUsers, pages, getUsers }) {
  const classes = useStyle();
  const columns = [
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

  const handlePageChange = async (e, page) => {
    console.log(page);
    await getUsers(`/admins/users?page=${page}`);
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
}
