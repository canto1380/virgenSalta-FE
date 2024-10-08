import { apiParams } from '../api'

export const getMessageVirgen = async (params) => {
  const res = await apiParams('GET', params, `messageVirgen/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
