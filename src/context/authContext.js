import { useContext, createContext, useState, useEffect } from "react";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import { withRouter } from "react-router-dom";
import { get } from "../api/genericApi";

const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthenticated"));
  const [admin, setAdmin] = useState();
  // const {} = withRouter();

  useEffect(() => {
    const getData = async () => {
      let response = await get("/admins/refresh");
      console.log("refresh admin");
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setAdmin(response.data.admin);
        localStorage.setItem("token", response.data.token);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
      }
    };
    if (!admin) {
      getData();
    }
  }, [admin, setAdmin]);
  return (
    <authContext.Provider value={{ isAuth, setIsAuth, admin, setAdmin }}>
      {children}
    </authContext.Provider>
  );
};
