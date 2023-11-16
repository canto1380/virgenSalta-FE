import { apiParams } from '../api'

export const getHistory = async (params) => {
  const res = await apiParams('GET', params, `history/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
