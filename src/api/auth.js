import {
  API_COMMON_STATUS,
  getUnknownStatusError,
} from "../helpers/api-helpers";
import api from "./api";
export const login = async (loginData) => {
  let data = {};
  try {
    let response = await api.post("admins/login", loginData);
    switch (response.status) {
      case API_COMMON_STATUS.SUCCESS:
        data = {
          responseStatus: API_COMMON_STATUS.SUCCESS,
          ...response,
        };
        break;
      default:
        data = getUnknownStatusError();
    }
    return data;
  } catch (e) {
    let response = e.response;
    switch (response.status) {
      case API_COMMON_STATUS.BAD_REQUEST:
        data = {
          responseStatus: API_COMMON_STATUS.BAD_REQUEST,
          ...response,
        };
        break;
      case API_COMMON_STATUS.ERROR:
        data = {
          responseStatus: API_COMMON_STATUS.ERROR,
          ...response,
        };
        break;
      default:
        data = getUnknownStatusError();
    }
    return data;
  }
};
