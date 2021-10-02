import { useState } from "react";
import { get } from "../api/genericApi";
import { API_COMMON_STATUS } from "../helpers/api-helpers";
const useFormHooks = () => {
  const [userCount, setUserCount] = useState("");
  const [user, setUser] = useState();
  const [openSearch, setOpenSearch] = useState(false);

  const handleUserDataChange = (e) => {
    let value = e.target.value;
    setUserCount(value);
  };

  const handleOpenSearch = (e) => {
    setOpenSearch(true);
  };

  const handleCloseSearch = (e) => {
    setOpenSearch(false);
  };

  const getUser = async (formic) => {
    if (userCount) {
      const response = await get(`/admins/users?userCount=${userCount}`);
      console.log(response);
      if (response.responseStatus === API_COMMON_STATUS.SUCCESS) {
        let user = response.data.users[0];
        if (user) {
          setUser(user);
          formic.setFieldValue("userId", user._id);
        }
      }
    } else {
      setUser(null);
    }
  };

  const setUserData = async (user, formic) => {
    setUser(user);
    formic.setFieldValue("userId", user._id);
    setUserCount(user.userCount);
  };
  return {
    setUserCount,
    userCount,
    setUser,
    user,
    handleUserDataChange,
    getUser,
    openSearch,
    handleCloseSearch,
    handleOpenSearch,
    setUserData,
  };
};

export default useFormHooks;
