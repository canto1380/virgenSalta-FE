import { apiParams } from '../api'

export const getMessageJesus = async (params) => {
  const res = await apiParams('GET', params, `messageJesus/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
