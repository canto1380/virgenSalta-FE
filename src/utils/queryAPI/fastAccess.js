import { apiParams } from "../api";

export const getFastAccess = async (params) => {
    const res = await apiParams("GET", params, `fastAccess/`, '');
    if (res.status === 200) {
      const data = res?.data;
      return data;
  }
};
