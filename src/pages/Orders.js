import React, { useState, useEffect, useCallback } from "react";
import Header from "../component/Orders/Header";
import { Grid, makeStyles } from "@material-ui/core";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import { get } from "../api/genericApi";
import { useHistory } from "react-router-dom";
import OrdersTable from "../component/Orders/OrdersTable";
import Filters from "../component/Orders/Filters";
const useStyle = makeStyles(() => ({
  root: {
    padding: "30px 0px",
  },
}));
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({});
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState("/admins/orders?");
  const [pages, setPages] = useState(1);
  const history = useHistory();
  const classes = useStyle();

  const getOrders = useCallback(
    async (url = "/admins/orders") => {
      let response = await get(url);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setSummary(response.data.summary);
        setOrders(response.data.orders.orders);
        let pagesNumber = Math.ceil(response.data.orders.ordersCount / 5);
        setPages(pagesNumber);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        history.push("/login");
      }
    },
    [history]
  );
  useEffect(() => {
    getOrders();
  }, [history, getOrders]);
  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Header data={summary} />
      <Filters url={url} setUrl={setUrl} page={page} getData={getOrders} />
      <OrdersTable
        getOrders={getOrders}
        orders={orders}
        setOrders={setOrders}
        pages={pages}
        setPage={setPage}
        url={url}
        setUrl={setUrl}
      />
    </Grid>
  );
};

export default Orders;
