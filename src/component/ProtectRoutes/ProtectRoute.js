import React from "react";
import { Route, Redirect } from "react-router-dom";
const ProtectRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("isAuthenticated");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="login" />
      }
    />
  );
};

export default ProtectRoute;
