import { apiParams } from "../api";

export const getNews = async () => {
    const res = await apiParams("GET", '', `news/`, '');
    if (res.status === 200) {
      const data = res?.data;
      return data;
  }
};
