import { apiParams } from "../api";

export const getEventType = async (params) => {
  // let res;
  // if(idEventType !== undefined){
  //   res = await apiParams("GET", params, `eventType/${idEventType}`, "");
  // } else {
   const res = await apiParams("GET", params, `eventType/`, "");
  // }
  if (res.status === 200) {
    const data = res?.data;
    return data;
  }
};
