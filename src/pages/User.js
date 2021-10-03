import React, { useEffect, useState, useCallback } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { get } from "../api/genericApi";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import Header from "../component/User/Header";
import OrdersTable from "../component/User/OrdersTable/OrdersTable";
import Filters from "../component/User/Filters";

const useStyle = makeStyles(() => ({
  root: {
    padding: "30px 0px",
  },
}));

const User = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState();
  const [userOrders, setUserOrders] = useState();
  const [url, setUrl] = useState(`/admins/users/${id}?`);
  const history = useHistory();
  const classes = useStyle();

  const getUserData = useCallback(
    async (url = `/admins/users/${id}`) => {
      console.log(url);
      setLoading(true);
      let response = await get(url);
      console.log(response);
      setLoading(false);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setUser(response.data.user);
        setUserOrders(response.data.user.orders);
        setSummaryData(response.data.summary);
        setPages(response.data.pages);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        history.push("/login");
      }
    },
    [history, id]
  );
  useEffect(() => {
    getUserData();
  }, [id, history, getUserData]);
  return (
    <Grid className={classes.root} container justifyContent="center">
      <Header loading={loading} data={summaryData} user={user} />
      <Filters
        page={page}
        url={url}
        setUrl={setUrl}
        user={user}
        getData={getUserData}
      />
      {userOrders && (
        <OrdersTable
          setPage={setPage}
          setPages={setPages}
          pages={pages}
          page={page}
          url={url}
          userOrders={userOrders}
          getData={getUserData}
          setUserOrders={setUserOrders}
        />
      )}
    </Grid>
  );
};

export default User;
