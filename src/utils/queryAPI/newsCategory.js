import { apiParams } from "../api";

export const getNewsCategory = async () => {
    const res = await apiParams("GET", '', `newsCategory/`, '');
    if (res.status === 200) {
      const data = res?.data;
      return data;
  }
};
