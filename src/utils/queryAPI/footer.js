import { apiParams } from '../api'

export const getFooter = async (params) => {
  const res = await apiParams('GET', params, `footer/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
