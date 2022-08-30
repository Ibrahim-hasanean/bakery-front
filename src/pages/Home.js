import React, { useState, useEffect, useCallback } from "react";
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
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState();
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    userCount: "",
    account: "",
  });
  const history = useHistory();
  const classes = useStyle();

  const getUsers = useCallback(
    async (page, reset = false, scrolling = true) => {
      let url = `/admins/users?page=${page}`;
      if (!reset) {
        if (data.name) url = url + `&name=${data.name}`;
        if (data.userCount) url = url + `&userCount=${data.userCount}`;
        if (data.phoneNumber) url = url + `&phoneNumber=${data.phoneNumber}`;
        if (data.account) url = url + `&account=${data.account}`;
      }
      setLoading(true);
      let response = await get(url);
      setLoading(false);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setUsers((users) =>
          scrolling
            ? [...users, ...response.data.users]
            : [...response.data?.users]
        );
        setPages(response.data.pages);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        history.push("/login");
      }
    },
    [history, data]
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let response = await get("/admins/orders/home");
      setLoading(false);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setSummary(response.data.summary);
        setUsers(response.data.users.users);
        setPages(response.data.pages);
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
      <Header loading={loading} data={summary} />
      <UsersFilters
        data={data}
        setData={setData}
        getUsers={getUsers}
        setUsers={setUsers}
        users={users}
        setPage={setPage}
      />
      <UsersTable
        setUsers={setUsers}
        getUsers={getUsers}
        rowsPerPage={10}
        page={page}
        setPage={setPage}
        users={users}
        pages={pages}
        loading={loading}
        hasMore={hasMore}
        setHasMore={setHasMore}
      />
    </Grid>
  );
};
