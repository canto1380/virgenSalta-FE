import { apiParams } from "../api";

export const getStatistics = async (params) => {
    const res = await apiParams("GET", params, `statistics/`, '');
    if (res.status === 200) {
      const data = res?.data;
      return data;
  }
};
