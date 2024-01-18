import { apiParams } from '../api'

export const getConfigurations = async (params) => {
  const res = await apiParams('GET', params, `configuration/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
