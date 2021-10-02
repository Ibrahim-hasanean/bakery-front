import * as React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import AdminsTableRow from "./AdminsTableRow";
import RTLProvider from "../helpers/RTLProvider";
const useStyle = makeStyles(() => ({
  paper: {
    width: "90%",
    overflow: "hidden",
    marginTop: "40px",
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
const AdminsTable = ({ admins, setAdmins }) => {
  const classes = useStyle();
  const columns = [
    "#",
    "رقم جوال المسؤول",
    "اسم المسؤول",
    "مسؤول النظام",
    "يمكنه ادارة الخبز",
    "يمكنه ادارة الدقيق",
    "يمكنه ادارة الدين",
    "يمكنه ادارة المستخدمين",
    "يمكنه ادارة  سند القبض ",
    "تعديل",
    "حذف",
  ];

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
              {admins.map((admin, index) => {
                return (
                  <AdminsTableRow
                    admins={admins}
                    setAdmins={setAdmins}
                    key={index}
                    admin={admin}
                    index={index}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </RTLProvider>
  );
};

export default AdminsTable;
