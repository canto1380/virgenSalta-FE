import { apiParams } from "../api";

export const getDailyEvent = async (params) => {
  const res = await apiParams("GET", params, `dailyEvent/`, "");
  if (res.status === 200) {
    const data = res?.data;
    return data;
  }
};
