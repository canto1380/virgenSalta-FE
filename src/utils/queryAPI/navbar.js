import { apiParams } from '../api'

export const getItemNav = async (params) => {
  const res = await apiParams('GET', params, `itemNav/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
