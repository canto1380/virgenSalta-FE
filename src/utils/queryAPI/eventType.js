import { apiParams } from "../api";

export const getEventType = async (params) => {
  const res = await apiParams("GET", params, `eventType/`, "");
  if (res.status === 200) {
    const data = res?.data;
    return data;
  }
};
