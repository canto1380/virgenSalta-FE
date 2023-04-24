import axios from "axios";

export const api = async (method, endpoint, data, token) => {
  try {
    const res = await axios({
      data,
      headers: {
        authorization: `${token}`,
      },
      method,
      url: `${process.env.REACT_APP_API}/${endpoint}`,
    });
    return res
  } catch (error) {
    return error
  }
};

export const apiParams = async (method, params, endpoint, data, token) => {
  try {
    const res = await axios({
      data,
      params,
      headers: {
        authorization: `${token}`,
      },
      method,
      url: `${process.env.REACT_APP_API}/${endpoint}`,
    });
    return res
  } catch (error) {
    return error
  }
};
