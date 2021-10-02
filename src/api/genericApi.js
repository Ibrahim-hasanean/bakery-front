import {
  API_COMMON_STATUS,
  getUnknownStatusError,
} from "../helpers/api-helpers";
import api from "./api";

export const post = async (url, postData) => {
  let data = {};
  const token = localStorage.getItem("token");
  try {
    let response = await api.post(url, postData, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
    switch (response.status) {
      case API_COMMON_STATUS.RESOURCE_CREATED:
        data = {
          responseStatus: API_COMMON_STATUS.RESOURCE_CREATED,
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
      case API_COMMON_STATUS.CONFLICT:
        data = {
          responseStatus: API_COMMON_STATUS.CONFLICT,
          ...response,
        };
        break;
      case API_COMMON_STATUS.ERROR:
        data = {
          responseStatus: API_COMMON_STATUS.ERROR,
          ...response,
        };
        break;
      case API_COMMON_STATUS.UNAUTHORIZED:
        data = {
          responseStatus: API_COMMON_STATUS.UNAUTHORIZED,
        };
        break;
      default:
        data = getUnknownStatusError();
    }
    return data;
  }
};

export const get = async (url) => {
  let data = {};
  const token = localStorage.getItem("token");
  try {
    let response = await api.get(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
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
      case API_COMMON_STATUS.UNAUTHORIZED:
        data = {
          responseStatus: API_COMMON_STATUS.UNAUTHORIZED,
        };
        break;
      default:
        data = getUnknownStatusError();
    }
    return data;
  }
};

export const patch = async (url, patchDate) => {
  let data = {};
  const token = localStorage.getItem("token");
  try {
    let response = await api.patch(url, patchDate, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
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
      case API_COMMON_STATUS.CONFLICT:
        data = {
          responseStatus: API_COMMON_STATUS.CONFLICT,
          ...response,
        };
        break;
      case API_COMMON_STATUS.UNAUTHORIZED:
        data = {
          responseStatus: API_COMMON_STATUS.UNAUTHORIZED,
        };
        break;
      default:
        data = getUnknownStatusError();
    }
    return data;
  }
};

export const deleteRequest = async (url) => {
  let data = {};
  const token = localStorage.getItem("token");
  try {
    let response = await api.delete(url, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    });
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
      case API_COMMON_STATUS.UNAUTHORIZED:
        data = {
          responseStatus: API_COMMON_STATUS.UNAUTHORIZED,
        };
        break;
      default:
        data = getUnknownStatusError();
    }
    return data;
  }
};
