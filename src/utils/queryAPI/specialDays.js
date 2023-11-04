import { apiParams } from '../api'

export const getSpecialDays = async (params) => {
  const res = await apiParams('GET', params, `specialDays/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
