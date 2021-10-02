import React, { useState } from "react";
import { Button, Grid, TextField, makeStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RTLProvider from "./RTLProvider";
import Pagination from "@material-ui/lab/Pagination";
import { API_COMMON_STATUS } from "../../helpers/api-helpers";
import { get } from "../../api/genericApi";
import { useHistory } from "react-router-dom";

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
  inputs: {
    margin: "5px",
  },
  tableCell: {
    padding: "10px",
  },
}));

const columns = [
  "رقم المستخدم",
  "اسم المتسخدم",
  "رقم جوال المستخدم",
  "اختر المستخدم",
];

const UserSearch = ({ setUserData, handleClose, formic }) => {
  const classes = useStyle();
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState(1);
  const [url, setUrl] = useState("/admins/users?");
  const [data, setData] = useState({
    userCount: "",
    name: "",
    phoneNumber: "",
  });
  const history = useHistory();

  const getUsers = async () => {
    let getUrl = url;
    if (data.name) getUrl = getUrl + `&name=${data.name}`;
    if (data.userCount) getUrl = getUrl + `&userCount=${data.userCount}`;
    if (data.phoneNumber) getUrl = getUrl + `&phoneNumber=${data.phoneNumber}`;
    setUrl(getUrl);
    let response = await get(getUrl);
    console.log(response);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      setUsers(response.data.users);
    } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      history.push("/login");
    }
  };

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData({ ...data, [name]: value });
    setUrl("/admins/users?");
  };

  const reset = (e) => {
    setData({ userCount: "", name: "", phoneNumber: "" });
  };

  const handlePageChange = async (e, page) => {
    console.log(page);
    await getUsers(`${url}?page=${page}`);
  };

  const selectUser = (user) => {
    setUserData(user, formic);
    handleClose();
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid container justifyContent="center" alignItems="center">
        <TextField
          onChange={handleChange}
          label="رقم المستخدم"
          className={classes.inputs}
          variant="outlined"
          value={data.userCount}
          name="userCount"
        />
        <TextField
          onChange={handleChange}
          label="اسم المستخدم"
          className={classes.inputs}
          variant="outlined"
          name="name"
          value={data.name}
        />
        <TextField
          onChange={handleChange}
          label="رقم جوال المستخدم"
          className={classes.inputs}
          variant="outlined"
          name="phoneNumber"
          value={data.phoneNumber}
        />
        <Button
          onClick={getUsers}
          className={classes.inputs}
          variant="contained"
          color="primary"
        >
          بحث
        </Button>
        <Button
          onClick={reset}
          className={classes.inputs}
          variant="contained"
          color="default"
        >
          تفريغ الحقول
        </Button>
      </Grid>
      <Grid container justifyContent="center" alignItems="center">
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
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user._id}
                      >
                        <TableCell className={classes.tableCell} align="center">
                          {user.userCount}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          {user.name}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          {user.phoneNumber}
                        </TableCell>
                        <TableCell className={classes.tableCell} align="center">
                          <Button
                            onClick={() => selectUser(user)}
                            variant="contained"
                            color="primary"
                          >
                            اختر
                          </Button>
                        </TableCell>
                      </TableRow>
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
      </Grid>
    </Grid>
  );
};

export default UserSearch;
