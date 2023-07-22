import { apiParams } from "../api";

export const getNews = async (params) => {
    const res = await apiParams("GET", params, `news/`, '');
    if (res.status === 200) {
      const data = res?.data;
      return data;
  }
};
