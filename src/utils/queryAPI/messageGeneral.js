import { apiParams } from '../api'

export const getMessageGeneral = async (params) => {
  const res = await apiParams('GET', params, `messageGeneral/`, '')
  if (res.status === 200) {
    const data = res?.data
    return data
  }
}
