import React, { useState, useEffect } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Header from "../component/Home/Header";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import { get } from "../api/genericApi";
import { useHistory } from "react-router-dom";
import UsersTable from "../component/Home/Users/UsersTable";
import UsersFilters from "../component/Home/Users/UsersFilters";
const useStyle = makeStyles(() => ({
  root: {
    padding: "30px 0px",
  },
}));
export const Home = () => {
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  const history = useHistory();
  const classes = useStyle();

  const getUsers = async (url = "/admins/users?") => {
    let response = await get(url);
    if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
      setUsers(response.data.users);
    } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      history.push("/login");
    }
  };
  useEffect(() => {
    const getData = async () => {
      let response = await get("/admins/orders/home");
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setSummary(response.data.summary);
        setUsers(response.data.users.users);
        let pagesNumber = Math.ceil(response.data.users.usersCount / 5);
        setPages(pagesNumber);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        history.push("/login");
      }
    };
    getData();
  }, [history]);

  return (
    <Grid className={classes.root} container justifyContent="center">
      <Header data={summary} />
      <UsersFilters getUsers={getUsers} setUsers={setUsers} users={users} />
      <UsersTable
        setUsers={setUsers}
        getUsers={getUsers}
        rowsPerPage={10}
        page={page}
        setPage={setPage}
        users={users}
        pages={pages}
      />
    </Grid>
  );
};
