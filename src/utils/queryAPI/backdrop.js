import { apiParams } from '../api'

export const getBackdrop = async (params) => {
  const res = await apiParams('GET', params, `backdrop/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
