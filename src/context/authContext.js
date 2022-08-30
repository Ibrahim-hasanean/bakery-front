import { useContext, createContext, useState, useEffect } from "react";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
import { get } from "../api/genericApi";
import { useHistory } from "react-router-dom";

const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuthenticated"));
  const [admin, setAdmin] = useState();
  const history = useHistory();
  // const {} = withRouter();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    setIsAuth(false);
    history?.push("/login");
  };
  useEffect(() => {
    const getData = async () => {
      let response = await get("/admins/refresh");
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        setAdmin(response.data.admin);
        localStorage.setItem("token", response.data.token);
      } else if (response.responseStatus === API_COMMON_STATUS.UNAUTHORIZED) {
        setIsAuth(false);
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        logout();
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
