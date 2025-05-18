import { api, apiParams } from '../api'

export const getItemNavCategory = async (params) => {
  const res = await apiParams('GET', params, `itemNavCategory/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}

export const getItemNavCategoryById = async (id) => {
  const res = await api('GET', `itemNavCategory/${id}`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
