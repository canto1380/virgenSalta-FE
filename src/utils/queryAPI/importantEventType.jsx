import { apiParams } from "../api";

export const getImportantEventType = async(params) => {
  const res = await apiParams('GET', params, 'importantEventType', '')
  if(res.status === 200) {
    const data = res?.data
    return data
  }
}