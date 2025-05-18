import { apiParams } from "../api";

export const getImportantEvent = async(params) => {
  const res = await apiParams('GET', params, 'importantEvent', '')
  if(res.status === 200) {
    const data = res?.data
    return data
  }
}