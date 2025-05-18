import { apiParams } from "../api";

export const getNewsCategory = async (params) => {
    const res = await apiParams("GET", params, `newsCategory/`, '');
    if (res.status === 200) {
      const data = res?.data;
      return data;
  }
};
